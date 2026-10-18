import { Box, Flex, Heading, Text, Button, Paper } from "@chellaa/react";

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export function NotFoundPage({ onNavigate, currentPath }: NotFoundPageProps) {
  return (
    <Box
      sx={{
        py: 8,
        px: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: "560px",
          width: "100%",
          p: 6,
          textAlign: "center",
          borderRadius: 3,
          border: "1px solid var(--cl-color-border-subtle, #e5e7eb)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--cl-color-primary-base, #4f46e5)",
            marginBottom: "12px",
          }}
        >
          404 Error
        </span>

        <Heading level={1} sx={{ fontSize: "2rem", fontWeight: 800, mb: 3 }}>
          Documentation Page Not Found
        </Heading>

        <Text
          variant="body1"
          sx={{
            color: "var(--cl-color-text-secondary, #4b5563)",
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          {currentPath ? (
            <>
              The documentation route <code style={{ padding: "2px 6px", background: "var(--cl-color-bg-subtle, #f3f4f6)", borderRadius: "4px" }}>{currentPath}</code> does not exist or may have been relocated.
            </>
          ) : (
            "The documentation page you requested does not exist or may have been relocated."
          )}
        </Text>

        <Flex gap={3} sx={{ justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            variant="solid"
            colorScheme="primary"
            onClick={() => onNavigate("/overview")}
          >
            Go to Overview
          </Button>
          <Button
            variant="outline"
            colorScheme="neutral"
            onClick={() => onNavigate("/components/button")}
          >
            Browse Components
          </Button>
        </Flex>
      </Paper>
    </Box>
  );
}
