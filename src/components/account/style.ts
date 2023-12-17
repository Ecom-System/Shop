import { createStyles} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    th: {
      padding: 100,
    },
  
    control: {
      width: '100%',
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    icon: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  }));

  
export default useStyles;