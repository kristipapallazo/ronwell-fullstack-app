type SetStateFunction<T> = React.Dispatch<SetStateAction<T>>;

interface ServerResponse {
  error?: boolean;
  message?: string;
  data?: unknown;
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  inventory: number;
};
type Products = Product[];

type Token = string | undefined | null;
