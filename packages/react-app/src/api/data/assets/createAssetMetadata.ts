import axios from "axios";

interface Props {
  assetId: string;
  externalURL: string;
  initialConditionReport: File;
}

export default async ({
  externalURL,
  initialConditionReport,
  assetId,
}: Props) => {
  const formData = new FormData();

  // append the initial condition report
  formData.append("initial-condition-report", initialConditionReport);

  formData.append("assetId", assetId);
  formData.append("externalURL", externalURL);

  const { data } = await axios.post("/assets", formData);

  return data;
};
