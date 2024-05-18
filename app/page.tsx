import Grid from "./_component/Grid";
import { generateUniqueNumbers } from "./utils/commonFunction";
export default function Home() {
  const gridData = generateUniqueNumbers(25);

  return (
    <>
      <div
        className={`w-100 flex justify-center items-center p-4 h-min-screen`}
      >
        <Grid isNumberCallBack={false} data = {gridData}/>
      </div>
    </>
  );
}
