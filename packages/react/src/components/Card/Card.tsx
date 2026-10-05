import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import type {
  CardProps,
  CardOwnerState,
  CardSize,
  CardHeaderProps,
  CardMediaProps,
  CardBodyProps,
  CardFooterProps,
  CardActionsProps,
} from "./Card.types";

// ─── Elevation Overlay Utility (M3 Dark Mode Surface Tinting) ────────────────

/**
 * Returns the white overlay alpha for a given Material Design 3 elevation level.
 * Matches the algorithm in Paper.tsx for cross-component consistency.
 */
function getOverlayAlpha(elevation: number): number {
  if (elevation <= 0) return 0;
  let alphaValue: number;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return Math.min(Math.round(alphaValue * 10) / 1000, 0.16);
}

// ─── Size Token Map ──────────────────────────────────────────────────────────

const sizeTokens: Record<CardSize, { padding: string; gap: string }> = {
  sm: { padding: "12px", gap: "8px" },
  md: { padding: "16px", gap: "12px" },
  lg: { padding: "24px", gap: "16px" },
};

// ─── Card Root Styled Component ──────────────────────────────────────────────

interface StyledCardRootProps {
  ownerState: CardOwnerState;
}

const StyledCardRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "ownerState" &&
    prop !== "asChild" &&
    prop !== "component" &&
    prop !== "hoverable" &&
    prop !== "square",
})<StyledCardRootProps>(({ theme, ownerState }) => {
  const { variant, elevation, hoverable, square } = ownerState;
  const isDark = theme.palette.mode === "dark";
  const clampedElevation = Math.max(0, Math.min(24, elevation));

  const base: Record<string, any> = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: square ? 0 : `${(theme.shape?.borderRadius ?? 4) * 2}px`,
    overflow: "hidden",
    boxSizing: "border-box",
    transition: theme.transitions.create(
      ["box-shadow", "transform", "background-color"],
      { duration: 200, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
    ),
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  };

  // ── Variant-specific surface / shadow / border ───────────────────────────

  if (variant === "outlined") {
    base.border = `1px solid ${theme.palette.divider}`;
    base.boxShadow = "none";
  } else if (variant === "filled") {
    base.backgroundColor = theme.palette.action?.hover ?? "rgba(0,0,0,0.04)";
    base.boxShadow = "none";
  } else {
    // elevated (default)
    base.boxShadow = theme.shadows[clampedElevation] ?? "none";

    // M3 dark mode elevation tinting
    if (isDark && clampedElevation > 0) {
      const alpha = getOverlayAlpha(clampedElevation);
      base.backgroundImage = `linear-gradient(rgba(255,255,255,${alpha}), rgba(255,255,255,${alpha}))`;
    }
  }

  // ── Hoverable lift ───────────────────────────────────────────────────────

  if (hoverable) {
    const hoverElevation = Math.min(clampedElevation + 2, 24);
    const hoverAlpha = isDark ? getOverlayAlpha(hoverElevation) : undefined;

    base["&:hover"] = {
      boxShadow: theme.shadows[hoverElevation] ?? "none",
      transform: "translateY(-2px)",
      ...(isDark && hoverAlpha !== undefined && variant === "elevated"
        ? {
            backgroundImage: `linear-gradient(rgba(255,255,255,${hoverAlpha}), rgba(255,255,255,${hoverAlpha}))`,
          }
        : {}),
      "@media (prefers-reduced-motion: reduce)": {
        transform: "none",
      },
    };

    base.cursor = "default";
  }

  return base;
});

// ─── Card Component ──────────────────────────────────────────────────────────

/**
 * Material Design 3-aligned surface container with compound sub-components.
 * Supports 3 visual variants, numeric M3 elevation, dark-mode overlay tinting,
 * and an optional hoverable lift mode.
 *
 * @example
 * <Card hoverable>
 *   <CardMedia image="/hero.jpg" alt="Hero" />
 *   <CardHeader title="Title" subheader="Subtitle" />
 *   <CardBody>Content here</CardBody>
 *   <CardActions>
 *     <Button>Action</Button>
 *   </CardActions>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(props, ref) {
    const {
      variant = "elevated",
      elevation = 1,
      size = "md",
      hoverable = false,
      square = false,
      asChild = false,
      component,
      as,
      children,
      ...rest
    } = props;

    const ownerState: CardOwnerState = {
      variant,
      elevation,
      size,
      hoverable,
      square,
    };

    const targetTag = component || as;

    if (asChild) {
      return (
        <StyledCardRoot
          as={Slot as any}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        >
          {children}
        </StyledCardRoot>
      );
    }

    return (
      <StyledCardRoot
        as={targetTag}
        ref={ref as any}
        ownerState={ownerState}
        {...rest}
      >
        {children}
      </StyledCardRoot>
    );
  }
);

Card.displayName = "Card";

// ─── CardHeader Styled Components ────────────────────────────────────────────

const StyledCardHeaderRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Header",
  shouldForwardProp: (prop) => prop !== "ownerState" && prop !== "asChild",
})<{ ownerState: { size: CardSize } }>(({ ownerState }) => {
  const tokens = sizeTokens[ownerState.size];
  return {
    display: "flex",
    alignItems: "center",
    padding: tokens.padding,
    gap: "12px",
    boxSizing: "border-box",
  };
});

const StyledCardHeaderContent = styled("div", {
  name: "ChellaaCard",
  slot: "HeaderContent",
})<Record<string, never>>({
  flex: "1 1 auto",
  minWidth: 0,
});

const StyledCardHeaderTitle = styled("span", {
  name: "ChellaaCard",
  slot: "HeaderTitle",
})<Record<string, never>>(({ theme }) => ({
  display: "block",
  fontSize: "1rem",
  fontWeight: 600,
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const StyledCardHeaderSubheader = styled("span", {
  name: "ChellaaCard",
  slot: "HeaderSubheader",
})<Record<string, never>>(({ theme }) => ({
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.4,
  color: theme.palette.text.secondary,
  marginTop: "2px",
}));

const StyledCardHeaderAvatar = styled("div", {
  name: "ChellaaCard",
  slot: "HeaderAvatar",
})<Record<string, never>>({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
});

const StyledCardHeaderAction = styled("div", {
  name: "ChellaaCard",
  slot: "HeaderAction",
})<Record<string, never>>({
  flexShrink: 0,
  alignSelf: "flex-start",
  marginTop: "-8px",
  marginRight: "-8px",
});

// ─── CardHeader Component ────────────────────────────────────────────────────

/**
 * Header zone of a Card. Supports avatar, title, subheader, and trailing action slots.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const {
      avatar,
      action,
      title,
      subheader,
      titleTypographyProps,
      subheaderTypographyProps,
      asChild = false,
      children,
      // Extract size from context — for now default to md; in a full
      // implementation this would come from a CardContext.
      ...rest
    } = props;

    const ownerState = { size: "md" as CardSize };

    if (asChild) {
      return (
        <StyledCardHeaderRoot
          as={Slot as any}
          ref={ref as any}
          ownerState={ownerState}
          {...rest}
        >
          {children}
        </StyledCardHeaderRoot>
      );
    }

    return (
      <StyledCardHeaderRoot ref={ref as any} ownerState={ownerState} {...rest}>
        {avatar && (
          <StyledCardHeaderAvatar className="ChellaaCard-headerAvatar">
            {avatar}
          </StyledCardHeaderAvatar>
        )}
        <StyledCardHeaderContent className="ChellaaCard-headerContent">
          {title != null && (
            <StyledCardHeaderTitle
              className="ChellaaCard-headerTitle"
              {...titleTypographyProps}
            >
              {title}
            </StyledCardHeaderTitle>
          )}
          {subheader != null && (
            <StyledCardHeaderSubheader
              className="ChellaaCard-headerSubheader"
              {...subheaderTypographyProps}
            >
              {subheader}
            </StyledCardHeaderSubheader>
          )}
          {children}
        </StyledCardHeaderContent>
        {action && (
          <StyledCardHeaderAction className="ChellaaCard-headerAction">
            {action}
          </StyledCardHeaderAction>
        )}
      </StyledCardHeaderRoot>
    );
  }
);

CardHeader.displayName = "CardHeader";

// ─── CardMedia Styled Component ──────────────────────────────────────────────

interface StyledCardMediaRootProps {
  image?: string;
  aspectRatio: string;
}

const StyledCardMediaRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Media",
  shouldForwardProp: (prop) => prop !== "image" && prop !== "aspectRatio",
})<StyledCardMediaRootProps>(({ image, aspectRatio }) => ({
  display: "block",
  width: "100%",
  aspectRatio: aspectRatio,
  objectFit: "cover",
  flexShrink: 0,
  ...(image
    ? {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${image})`,
      }
    : {}),
  // If children are an <img>, make it fill the zone
  "& img": {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

// ─── CardMedia Component ─────────────────────────────────────────────────────

/**
 * Aspect-ratio-locked media zone that bleeds to card edges.
 * Use the `image` prop for CSS background shorthand, or place an `<img>`
 * child for semantic HTML.
 */
export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  function CardMedia(props, ref) {
    const {
      image,
      alt,
      aspectRatio = "16/9",
      component,
      children,
      ...rest
    } = props;

    const targetTag = component;

    return (
      <StyledCardMediaRoot
        as={targetTag}
        ref={ref as any}
        image={image}
        aspectRatio={aspectRatio}
        role={image && !children ? "img" : undefined}
        aria-label={image && !children ? alt : undefined}
        {...rest}
      >
        {children}
      </StyledCardMediaRoot>
    );
  }
);

CardMedia.displayName = "CardMedia";

// ─── CardBody Styled Component ───────────────────────────────────────────────

const StyledCardBodyRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Body",
})<Record<string, never>>(({ theme: _theme }) => ({
  flex: "1 1 auto",
  padding: "0 16px 16px 16px",
  boxSizing: "border-box",
  color: "inherit",
}));

// ─── CardBody Component ──────────────────────────────────────────────────────

/**
 * Main flexible content zone of a Card.
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody(props, ref) {
    const { children, ...rest } = props;
    return (
      <StyledCardBodyRoot ref={ref as any} {...rest}>
        {children}
      </StyledCardBodyRoot>
    );
  }
);

CardBody.displayName = "CardBody";

// ─── CardFooter Styled Component ─────────────────────────────────────────────

interface StyledCardFooterRootProps {
  divider: boolean;
}

const StyledCardFooterRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Footer",
  shouldForwardProp: (prop) => prop !== "divider",
})<StyledCardFooterRootProps>(({ theme, divider }) => ({
  padding: "12px 16px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
  ...(divider
    ? { borderTop: `1px solid ${theme.palette.divider}` }
    : {}),
}));

// ─── CardFooter Component ────────────────────────────────────────────────────

/**
 * Semantic footer zone of a Card. Use for metadata, tags, timestamps.
 * Use `divider` to render a 1px separator between body and footer.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const { divider = false, children, ...rest } = props;
    return (
      <StyledCardFooterRoot ref={ref as any} divider={divider} {...rest}>
        {children}
      </StyledCardFooterRoot>
    );
  }
);

CardFooter.displayName = "CardFooter";

// ─── CardActions Styled Component ────────────────────────────────────────────

interface StyledCardActionsRootProps {
  disableSpacing: boolean;
}

const StyledCardActionsRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Actions",
  shouldForwardProp: (prop) => prop !== "disableSpacing",
})<StyledCardActionsRootProps>(({ disableSpacing }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  boxSizing: "border-box",
  flexWrap: "wrap",
  gap: "4px",
  ...(!disableSpacing
    ? {
        // Negative margin brings buttons flush with card padding
        marginLeft: "-4px",
        marginRight: "-4px",
      }
    : {}),
}));

// ─── CardActions Component ───────────────────────────────────────────────────

/**
 * Flex action strip for Button / Link controls inside a Card.
 * By default applies a slight negative margin to align icon-buttons
 * flush to the card's padding box. Use `disableSpacing` to remove this.
 */
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  function CardActions(props, ref) {
    const { disableSpacing = false, children, ...rest } = props;
    return (
      <StyledCardActionsRoot
        ref={ref as any}
        disableSpacing={disableSpacing}
        {...rest}
      >
        {children}
      </StyledCardActionsRoot>
    );
  }
);

CardActions.displayName = "CardActions";
