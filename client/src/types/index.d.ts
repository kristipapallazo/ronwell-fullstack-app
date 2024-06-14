type SetStateFn<T> = React.SetStateAction<T>;

interface ServerResponse {
  error?: boolean;
  message?: string;
  data?: unknown;
}
