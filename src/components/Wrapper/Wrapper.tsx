import styles from "./wrapper.module.css";
import type { PropsWithChildren } from "react";

function Wrapper({ children }: PropsWithChildren<{}>) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Wrapper;
