export enum EvalProgressStatus {
  Started = "Started",
  InProgress = "In Progress",
  OnTrack = "On Track",
  NearPass = "Near Pass",
  Complete = "Complete",
}

export const useGetEvalProgressStatus = (): ((progress: number) => string) => {
  return (progress: number) => {
    if (progress >= 0 && progress < 25) {
      return EvalProgressStatus.Started;
    } else if (progress >= 25 && progress < 30) {
      return EvalProgressStatus.InProgress;
    } else if (progress >= 30 && progress < 60) {
      return EvalProgressStatus.OnTrack;
    } else if (progress >= 60 && progress < 100) {
      return EvalProgressStatus.NearPass;
    } else if (progress === 100) {
      return EvalProgressStatus.Complete;
    } else {
      return "Unknown Status";
    }
  };
};

export default useGetEvalProgressStatus;
