export interface StepProps {
  currentStep: number;
  apiKey: ApiKey | undefined;
  setApiKey: React.Dispatch<React.SetStateAction<ApiKey | undefined>>;
}

export interface ApiKey {
  _id: string;
  key: string;
  name: string;
  disabled: boolean;
}
