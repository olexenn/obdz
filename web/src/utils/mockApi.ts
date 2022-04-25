interface IProps {
  username: string;
  password: string;
}
export const userLogin = async ({ username, password }: IProps) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (username === "test" && password === "test") {
        resolve();
      } else {
        reject();
      }
    }, 3000);
  });
};
