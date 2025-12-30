import Page from "@components/Page/Page";
import { color } from "@styles/colors";
import { ClipLoader } from "react-spinners";

export interface LoadingPageProps {
  loading?: boolean;
}

const LoadingPage: React.FunctionComponent<LoadingPageProps> = ({
  loading = true,
}) => {
  return (
    <Page>
      <ClipLoader
        color={color("SystemBackground1")}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Page>
  );
};

export default LoadingPage;
