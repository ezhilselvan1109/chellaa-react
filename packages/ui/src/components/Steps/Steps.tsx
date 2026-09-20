import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { injectStyle } from "../../styles/registry";
import { tokensCssText } from "../../tokens/tokens.style";
import { stepsCssText } from "./Steps.style";
import type {
  StepsProps,
  StepItem,
  StepStatus,
} from "./Steps.types";
import { Step, type StepFC } from "./Step";

/** Default Checkmark Icon for finish status */
const CheckIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="check"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
  </svg>
);

/** Default Error Close Icon for error status */
const CloseIcon: React.FC = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="close"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

/** Progress SVG Circle for active percent step */
const ProgressCircle: React.FC<{ percent: number }> = ({ percent }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference;

  return (
    <svg className="ch-steps-progress-circle" viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r={radius}
        stroke="var(--color-primary, #1677ff)"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  );
};

export const InternalSteps = forwardRef<HTMLDivElement, StepsProps>(
  (props, ref) => {
    const {
      className = "",
      rootClassName = "",
      style,
      current = 0,
      initial = 0,
      status = "process",
      orientation: orientationProp,
      direction,
      size = "medium",
      type = "default",
      variant = "filled",
      titlePlacement: titlePlacementProp,
      labelPlacement,
      percent,
      responsive = true,
      maxCount,
      iconRender,
      onChange,
      items: itemsProp,
      children,
      classNames,
      styles,
      ...restProps
    } = props;

    if (typeof window !== "undefined") {
      injectStyle("ch-theme-tokens", tokensCssText);
      injectStyle("ch-steps", stepsCssText);
    }

    const effectiveOrientation = orientationProp || direction || "horizontal";
    const effectiveTitlePlacement = titlePlacementProp || labelPlacement || "horizontal";

    // Responsive screen width listener
    const [isScreenSmall, setIsScreenSmall] = useState(false);

    useEffect(() => {
      if (!responsive || typeof window === "undefined") return undefined;
      const media = window.matchMedia("(max-width: 532px)");
      const updateMatch = (e: MediaQueryListEvent | MediaQueryList) => {
        setIsScreenSmall(e.matches);
      };
      updateMatch(media);

      const handler = (e: MediaQueryListEvent) => updateMatch(e);
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }, [responsive]);

    const actualOrientation =
      responsive && isScreenSmall ? "vertical" : effectiveOrientation;

    // Parse step items from items prop or JSX children
    const rawItems = useMemo<StepItem[]>(() => {
      if (itemsProp && Array.isArray(itemsProp)) {
        return itemsProp;
      }

      const result: StepItem[] = [];
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;
        const childType = child.type as any;
        if (childType?.isStepsStep || childType?.displayName === "Step") {
          result.push(child.props as StepItem);
        }
      });
      return result;
    }, [itemsProp, children]);

    // Handle maxCount windowing & ellipsis collapsing
    const processedItems = useMemo<{ item: StepItem; originalIndex: number; isEllipsis?: boolean }[]>(() => {
      const total = rawItems.length;
      if (!maxCount || total <= maxCount || maxCount < 3) {
        return rawItems.map((item, originalIndex) => ({ item, originalIndex }));
      }

      // MaxCount windowing around current step
      const visibleCount = maxCount;
      const result: { item: StepItem; originalIndex: number; isEllipsis?: boolean }[] = [];

      const addItem = (idx: number) => {
        const itm = rawItems[idx];
        if (itm) {
          result.push({ item: itm, originalIndex: idx });
        }
      };

      if (current <= 1) {
        // Near start
        for (let i = 0; i < visibleCount - 2; i++) {
          addItem(i);
        }
        result.push({
          item: { title: "...", disabled: true },
          originalIndex: -1,
          isEllipsis: true,
        });
        addItem(total - 1);
      } else if (current >= total - 2) {
        // Near end
        addItem(0);
        result.push({
          item: { title: "...", disabled: true },
          originalIndex: -1,
          isEllipsis: true,
        });
        for (let i = total - (visibleCount - 2); i < total; i++) {
          addItem(i);
        }
      } else {
        // Middle
        addItem(0);
        result.push({
          item: { title: "...", disabled: true },
          originalIndex: -1,
          isEllipsis: true,
        });
        addItem(current);
        result.push({
          item: { title: "...", disabled: true },
          originalIndex: -2,
          isEllipsis: true,
        });
        addItem(total - 1);
      }

      return result;
    }, [rawItems, maxCount, current]);

    // Resolve semantic classNames and styles
    const resolvedClassNames = useMemo(() => {
      if (!classNames) return {};
      if (typeof classNames === "function") {
        return classNames({ props });
      }
      return classNames;
    }, [classNames, props]);

    const resolvedStyles = useMemo(() => {
      if (!styles) return {};
      if (typeof styles === "function") {
        return styles({ props });
      }
      return styles;
    }, [styles, props]);

    // Step click handler
    const handleStepClick = useCallback(
      (e: React.MouseEvent<HTMLElement>, index: number, item: StepItem, isEllipsis?: boolean) => {
        if (isEllipsis || item.disabled) return;
        item.onClick?.(e);
        onChange?.(index);
      },
      [onChange]
    );

    const isClickable = Boolean(onChange);

    const sizeClass = size === "small" ? "ch-steps-sm" : "ch-steps-md";
    const typeClass = `ch-steps-${type}`;
    const orientationClass = `ch-steps-${actualOrientation}`;
    const titlePlacementClass =
      effectiveTitlePlacement === "vertical" ? "ch-steps-title-vertical" : "";
    const variantClass = `ch-steps-variant-${variant}`;

    return (
      <div
        ref={ref}
        className={[
          "ch-steps",
          orientationClass,
          sizeClass,
          typeClass,
          titlePlacementClass,
          variantClass,
          isClickable ? "ch-steps-clickable" : "",
          className,
          rootClassName,
          resolvedClassNames["root"] || "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ ...style, ...resolvedStyles["root"] }}
        {...restProps}
      >
        {processedItems.map(({ item, originalIndex, isEllipsis }, idx) => {
          // Compute status
          let itemStatus: StepStatus;
          if (item.status) {
            itemStatus = item.status;
          } else if (isEllipsis) {
            itemStatus = "wait";
          } else if (originalIndex < current) {
            itemStatus = "finish";
          } else if (originalIndex === current) {
            itemStatus = status || "process";
          } else {
            itemStatus = "wait";
          }

          const statusClass = `ch-steps-item-${itemStatus}`;
          const isItemDisabled = Boolean(item.disabled || isEllipsis);
          const isDisabledClass = isItemDisabled ? "ch-steps-item-disabled" : "";
          const isEllipsisClass = isEllipsis ? "ch-steps-item-ellipsis" : "";

          // Resolve step icon
          let iconNode: React.ReactNode;
          if (isEllipsis) {
            iconNode = <span>•••</span>;
          } else if (type === "dot") {
            iconNode = null;
          } else if (item.icon) {
            iconNode = item.icon;
          } else if (itemStatus === "finish") {
            iconNode = <CheckIcon />;
          } else if (itemStatus === "error") {
            iconNode = <CloseIcon />;
          } else {
            iconNode = <span>{initial + originalIndex + 1}</span>;
          }

          if (iconRender && !isEllipsis && type !== "dot") {
            iconNode = iconRender(iconNode, {
              index: originalIndex,
              active: originalIndex === current,
              item,
            });
          }

          const hasPercent =
            percent !== undefined &&
            itemStatus === "process" &&
            type === "default" &&
            !isEllipsis;

          const descriptionContent = item.description ?? item.content;

          return (
            <div
              key={item.key || (isEllipsis ? `ellipsis-${originalIndex}` : `step-${originalIndex}`)}
              className={[
                "ch-steps-item",
                statusClass,
                isDisabledClass,
                isEllipsisClass,
                item.className || "",
                resolvedClassNames["item"] || "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ ...item.style, ...resolvedStyles["item"] }}
            >
              <div
                className={[
                  "ch-steps-item-wrapper",
                  resolvedClassNames["itemWrapper"] || "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={resolvedStyles["itemWrapper"]}
                onClick={(e) => handleStepClick(e, originalIndex, item, isEllipsis)}
                tabIndex={isClickable && !isItemDisabled ? 0 : undefined}
                role={isClickable && !isItemDisabled ? "button" : undefined}
                onKeyDown={(e) => {
                  if (
                    isClickable &&
                    !isItemDisabled &&
                    (e.key === "Enter" || e.key === " ")
                  ) {
                    e.preventDefault();
                    handleStepClick(e as any, originalIndex, item, isEllipsis);
                  }
                }}
              >
                {/* Step Icon */}
                <div
                  className={[
                    "ch-steps-item-icon",
                    resolvedClassNames["itemIcon"] || "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={resolvedStyles["itemIcon"]}
                >
                  {iconNode}
                  {hasPercent && <ProgressCircle percent={percent!} />}
                </div>

                {/* Step Content Section */}
                <div
                  className={[
                    "ch-steps-item-section",
                    resolvedClassNames["itemSection"] || "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={resolvedStyles["itemSection"]}
                >
                  {/* Step Header */}
                  <div
                    className={[
                      "ch-steps-item-header",
                      resolvedClassNames["itemHeader"] || "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={resolvedStyles["itemHeader"]}
                  >
                    {item.title && (
                      <div
                        className={[
                          "ch-steps-item-title",
                          resolvedClassNames["itemTitle"] || "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={resolvedStyles["itemTitle"]}
                      >
                        {item.title}
                      </div>
                    )}
                    {item.subTitle && (
                      <div
                        className={[
                          "ch-steps-item-subtitle",
                          resolvedClassNames["itemSubtitle"] || "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={resolvedStyles["itemSubtitle"]}
                      >
                        {item.subTitle}
                      </div>
                    )}

                    {/* In horizontal title placement, the connecting rail lives in the header after title/subtitle */}
                    {effectiveTitlePlacement === "horizontal" &&
                      actualOrientation === "horizontal" &&
                      type !== "navigation" &&
                      type !== "panel" &&
                      idx < processedItems.length - 1 && (
                        <div
                          className={[
                            "ch-steps-item-rail",
                            resolvedClassNames["itemRail"] || "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={resolvedStyles["itemRail"]}
                        />
                      )}
                  </div>

                  {/* Step Description */}
                  {descriptionContent && (
                    <div
                      className={[
                        "ch-steps-item-description",
                        resolvedClassNames["itemContent"] || "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={resolvedStyles["itemContent"]}
                    >
                      {descriptionContent}
                    </div>
                  )}
                </div>

                {/* In vertical title placement or vertical orientation, the connecting rail lives in the item wrapper */}
                {(effectiveTitlePlacement === "vertical" || actualOrientation === "vertical") &&
                  type !== "navigation" &&
                  type !== "panel" &&
                  idx < processedItems.length - 1 && (
                    <div
                      className={[
                        "ch-steps-item-rail",
                        resolvedClassNames["itemRail"] || "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={resolvedStyles["itemRail"]}
                    />
                  )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

InternalSteps.displayName = "Steps";

export interface CompoundedSteps
  extends React.ForwardRefExoticComponent<
    StepsProps & React.RefAttributes<HTMLDivElement>
  > {
  Step: StepFC;
}

export const Steps = InternalSteps as CompoundedSteps;
Steps.Step = Step;
