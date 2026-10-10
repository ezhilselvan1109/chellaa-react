"use client";

import * as React from "react";
import { styled } from "../../system/styled";
import { Slot } from "../../primitives/Slot";
import { classNames } from "../../utils/classNames";
import { CardContext } from "./CardContext";
import type {
  CardProps,
  CardHeaderProps,
  CardMediaProps,
  CardBodyProps,
  CardFooterProps,
  CardActionsProps,
} from "./Card.types";

// ─── Card Root Styled Component ──────────────────────────────────────────────

const StyledCardRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Root",
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "elevation" &&
    prop !== "hoverable" &&
    prop !== "square" &&
    prop !== "size" &&
    prop !== "asChild" &&
    prop !== "component",
})({});

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
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const cardClassName = classNames(
      "cl-card",
      `cl-card--${size}`,
      `cl-card--${variant}`,
      square && "cl-card--square",
      hoverable && "cl-card--hoverable",
      className
    );

    const targetTag = component || as;

    return (
      <CardContext.Provider value={{ size }}>
        {asChild ? (
          <StyledCardRoot
            as={Slot as any}
            ref={ref as any}
            className={cardClassName}
            style={style}
            sx={sx}
            {...rest}
          >
            {children}
          </StyledCardRoot>
        ) : (
          <StyledCardRoot
            as={targetTag}
            ref={ref as any}
            className={cardClassName}
            style={style}
            sx={sx}
            {...rest}
          >
            {children}
          </StyledCardRoot>
        )}
      </CardContext.Provider>
    );
  }
);

Card.displayName = "Card";

// ─── CardHeader Styled Components ────────────────────────────────────────────

const StyledCardHeaderRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Header",
  shouldForwardProp: (prop) => prop !== "cardSize" && prop !== "asChild",
})({});

// ─── CardHeader Component ────────────────────────────────────────────────────

/**
 * Header zone of a Card. Supports avatar, title, subheader, and trailing action slots.
 * Automatically inherits `size` from the parent Card via CardContext.
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
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const headerClassName = classNames(
      "cl-card__header",
      "ChellaaCard-header",
      className
    );

    if (asChild) {
      return (
        <StyledCardHeaderRoot
          as={Slot as any}
          ref={ref as any}
          className={headerClassName}
          style={style}
          sx={sx}
          {...rest}
        >
          {children}
        </StyledCardHeaderRoot>
      );
    }

    return (
      <StyledCardHeaderRoot
        ref={ref as any}
        className={headerClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {avatar && (
          <div className="cl-card__header-avatar ChellaaCard-headerAvatar">
            {avatar}
          </div>
        )}
        <div className="cl-card__header-content ChellaaCard-headerContent">
          {title != null && (
            <span
              className={classNames(
                "cl-card__header-title",
                "ChellaaCard-headerTitle",
                titleTypographyProps?.className
              )}
              {...titleTypographyProps}
            >
              {title}
            </span>
          )}
          {subheader != null && (
            <span
              className={classNames(
                "cl-card__header-subheader",
                "ChellaaCard-headerSubheader",
                subheaderTypographyProps?.className
              )}
              {...subheaderTypographyProps}
            >
              {subheader}
            </span>
          )}
          {children}
        </div>
        {action && (
          <div className="cl-card__header-action ChellaaCard-headerAction">
            {action}
          </div>
        )}
      </StyledCardHeaderRoot>
    );
  }
);

CardHeader.displayName = "CardHeader";

// ─── CardMedia Styled Component ──────────────────────────────────────────────

const StyledCardMediaRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Media",
  shouldForwardProp: (prop) => prop !== "image" && prop !== "aspectRatio",
})({});

// ─── CardMedia Component ─────────────────────────────────────────────────────

/**
 * Aspect-ratio-locked media zone that bleeds edge-to-edge within the card.
 * Use the `image` prop for a CSS background shorthand, or place an `<img>`
 * child for semantic HTML (preferred for accessibility).
 */
export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  function CardMedia(props, ref) {
    const {
      image,
      alt,
      aspectRatio = "16/9",
      component,
      className,
      style,
      sx,
      children,
      ...rest
    } = props;

    const mediaStyle: React.CSSProperties = {
      ...(aspectRatio ? { aspectRatio } : {}),
      ...(image ? { backgroundImage: `url(${image})` } : {}),
      ...style,
    };

    const mediaClassName = classNames(
      "cl-card__media",
      "ChellaaCard-media",
      className
    );

    return (
      <StyledCardMediaRoot
        as={component}
        ref={ref as any}
        className={mediaClassName}
        style={mediaStyle}
        sx={sx}
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
  shouldForwardProp: (prop) => prop !== "cardSize",
})({});

// ─── CardBody Component ──────────────────────────────────────────────────────

/**
 * Main flexible content zone of a Card.
 * Inherits `size` from parent Card for consistent padding.
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody(props, ref) {
    const { children, className, style, sx, ...rest } = props;
    const bodyClassName = classNames("cl-card__body", "ChellaaCard-body", className);

    return (
      <StyledCardBodyRoot
        ref={ref as any}
        className={bodyClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledCardBodyRoot>
    );
  }
);

CardBody.displayName = "CardBody";

// ─── CardFooter Styled Component ─────────────────────────────────────────────

const StyledCardFooterRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Footer",
  shouldForwardProp: (prop) => prop !== "divider" && prop !== "cardSize",
})({});

// ─── CardFooter Component ────────────────────────────────────────────────────

/**
 * Semantic footer zone of a Card. Use for metadata, tags, timestamps.
 * Set `divider` to render a 1px separator between the body and footer.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const { divider = false, children, className, style, sx, ...rest } = props;
    const footerClassName = classNames(
      "cl-card__footer",
      "ChellaaCard-footer",
      divider && "cl-card__footer--divider",
      className
    );

    return (
      <StyledCardFooterRoot
        ref={ref as any}
        className={footerClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledCardFooterRoot>
    );
  }
);

CardFooter.displayName = "CardFooter";

// ─── CardActions Styled Component ────────────────────────────────────────────

const StyledCardActionsRoot = styled("div", {
  name: "ChellaaCard",
  slot: "Actions",
  shouldForwardProp: (prop) => prop !== "disableSpacing" && prop !== "cardSize",
})({});

// ─── CardActions Component ───────────────────────────────────────────────────

/**
 * Flex action strip for Button / Link controls inside a Card.
 * By default applies a slight negative margin to align icon-buttons
 * flush to the card's padding box. Use `disableSpacing` to remove this.
 */
export const CardActions = React.forwardRef<HTMLDivElement, CardActionsProps>(
  function CardActions(props, ref) {
    const { disableSpacing = false, children, className, style, sx, ...rest } = props;
    const actionsClassName = classNames(
      "cl-card__actions",
      "ChellaaCard-actions",
      disableSpacing && "cl-card__actions--disable-spacing",
      className
    );

    return (
      <StyledCardActionsRoot
        ref={ref as any}
        className={actionsClassName}
        style={style}
        sx={sx}
        {...rest}
      >
        {children}
      </StyledCardActionsRoot>
    );
  }
);

CardActions.displayName = "CardActions";
