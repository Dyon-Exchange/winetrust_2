import axios from "axios";

interface Props {
  assetId: string;
  externalURL: string;
  internalMarketingImage: File;
  externalMarketingImage: File;
  initialConditionText: string;
  initialConditionReport: File;
  initialConditionReport2: File;
  initialConditionReport3: File;
  initialConditionReport4: File;
  initialConditionReport5: File;
  initialConditionReport6: File;
}

export default async ({
  externalURL,
  internalMarketingImage,
  externalMarketingImage,
  initialConditionText,
  initialConditionReport,
  initialConditionReport2,
  initialConditionReport3,
  initialConditionReport4,
  initialConditionReport5,
  initialConditionReport6,
  assetId,
}: Props) => {
  const formData = new FormData();

  // append the initial condition report
  formData.append("internal-marketing-image", internalMarketingImage);
  formData.append("external-marketing-image", externalMarketingImage);
  formData.append("initial-condition-report", initialConditionReport);

  if (initialConditionReport2) {
    formData.append("initial-condition-report2", initialConditionReport2);
  }

  if (initialConditionReport3) {
    formData.append("initial-condition-report3", initialConditionReport3);
  }

  if (initialConditionReport4) {
    formData.append("initial-condition-report4", initialConditionReport4);
  }

  if (initialConditionReport5) {
    formData.append("initial-condition-report5", initialConditionReport5);
  }

  if (initialConditionReport6) {
    formData.append("initial-condition-report6", initialConditionReport6);
  }

  formData.append("assetId", assetId);
  formData.append("externalURL", externalURL);
  formData.append("initialConditionText", initialConditionText);

  const { data } = await axios.post("/assets", formData);

  return data;
};
