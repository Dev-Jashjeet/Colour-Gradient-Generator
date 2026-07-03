import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

interface gradientProps {
  gradient: string,
  css: string,
};

function App() {
  const [type, setType] = useState<string>("Linear");
  const [num, setNum] = useState<number>(12);
  const [gradient, setGradient] = useState<gradientProps[]>([]);

  const getHexCode = (): string => {
    const rgb: number = Math.pow(255,3);
    let random: number = Math.random() * rgb;
    random = Math.floor(random);
    let hexCode: string = random.toString(16);
    hexCode = hexCode.padEnd(6,"0");
    return `#${hexCode}`;
  }

  const generateGradient = (): void => {
      const color: gradientProps[] = []; //[ {}, {}, {} ] 
      for(let i=0; i<num; i++) {
        const color1: string = getHexCode();
        const color2: string = getHexCode();
        const degree: number = Math.floor(Math.random() * 360);
        const degreeString: string = `${degree}deg`;
        if(type === "Linear") {
          const obj: gradientProps = {
            gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
            css: `background: linear-gradient(${degreeString}, ${color1}, ${color2})`,
          };
          color.push(obj);
        } else {
          const obj: gradientProps = {
            gradient: `radial-gradient(circle, ${color1}, ${color2})`,
            css: `background: radial-gradient("circle", ${color1}, ${color2})`,
          };
          color.push(obj);
        }
      }
      setGradient(color);
      return;
    }

    useEffect(generateGradient, [num, type]);

    const onCopy = (css: string): void => {
      navigator.clipboard.writeText(css);
      toast.success("Gradient Code Copied", {position: 'top-center'});
      return;
    }

  return (
      <div className="min-h-screen flex items-center bg-gray-100 flex-col">

        <div className="h-17 w-300 rounded-xl mt-5 flex items-center justify-between p-5" style={{backgroundColor: getHexCode()}}>
          <div className="flex items-center">
            <span className="text-4xl mr-1 font-black">🎨</span>
            <span className="text-3xl">Gradient Generator - {num} {type}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="h-2 w-25 p-4 rounded-xs bg-white"
              placeholder="12"
              onChange={(event): void => setNum(Number(event.target.value))}
            />

            <select
              className="h-8 w-25 rounded-xs bg-white cursor-pointer"
              defaultValue={"Linear"}
              onChange={(event): void => setType(event.target.value)}
            >
              <option value="Linear">Linear</option>
              <option value="Radient">Radient</option>
            </select>

            <div className="bg-red-400 hover:bg-red-300 h-auto w-50 rounded-xs flex items-center justify-center cursor-pointer" onClick={generateGradient}>
              Generate New
            </div>
          </div>
        </div>

        <div className="body-container h-full w-300 mt-5 grid grid-cols-5 gap-3">
          {
            gradient.map((item, key) => (
              <div style={{background: item.gradient}} className="h-40 w-50 rounded-xl hover: cursor-pointer" key={key} onClick={(): void => onCopy(item.css)}></div>
            ))
          }
        </div>

      <ToastContainer />
      </div>
  );
}

export default App;
