import { createStyles, Text, TextProps } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  badge: {
    width: "fit-content",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.secondary?.[1] || "#f0f0f0",
    color: theme.black,
    fontWeight: 500,
    textTransform: "uppercase",
    fontSize: theme.fontSizes.sm,
    lineHeight: "14px",
  },
}));

interface IProps extends TextProps {
  title: string;
}

const TitleBadge = ({ title, ...rest }: IProps) => {
  const { classes } = useStyles();

  return (
    <Text className={classes.badge} mb="lg" {...rest}>
      {title}
    </Text>
  );
};

export default TitleBadge;
