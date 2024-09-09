// import { useEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";

// setInterval(()=>fetchData(),3000)

function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  // asyc function to get API data and store in state variable advice
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const datum = await response.json();
      setAdvice(datum?.slip?.advice);
      setCount(datum?.slip?.id);
    } catch (error) {
      setLoading(false)
      console.log("Error:", error);
    } finally {
      setLoading(true);
    }
  };

  // Generate advice onpageload
  useEffect(() => {
    fetchData();
  }, []);
  // update the count state variable on button click
  const update = () => {
    setLoading(false)
    fetchData();
  };

  return (
    <div className="flex justify-center items-center bg-[#212633] lg:w-screen h-screen lg:h-screen">
      <div className="bg-[#303A48] relative flex justify-evenly items-center flex-col px-4 lg:w-2/5 w-3/4 h-1/4 lg:h-2/5 rounded-xl">
        <h4 className="text-[#53FFAB]">ADVICE#{count}</h4>  
        <h2 className="text-white text-sm lg:text-xl text-center font-bold">
            {loading ? <span>{advice}</span> : <PreLoader />}
          </h2>
        <img
          src="/images/pattern-divider-desktop.svg"
          alt="divider"
          className="lg:py-4 py-6"
        />
        <a
          href="#"
          onClick={update}
          className="absolute bg-[#53FFAB] p-4 rounded-full z-50 -bottom-6"
        >
          <img src="/images/icon-dice.svg" className="" alt="" />
        </a>
      </div>
    </div>
  );
}

function PreLoader() {
  return (
    <div className="flex gap-3">
      <span className="w-2 h-1 rounded-full bg-[#53FFAB] p-2" style={{animationName:'moveUpDown', animationDuration: '1.5s', animationIterationCount: 'infinite'}}></span>
      <span className="w-2 h-1 rounded-full bg-[#53FFAB] p-2"  style={{animationName:'moveUpDown', animationDuration: '1.5s', animationIterationCount: 'infinite', animationDelay:'0.1s'}}></span>
      <span className="w-2 h-1 rounded-full bg-[#53FFAB] p-2"  style={{animationName:'moveUpDown', animationDuration: '1.5s', animationIterationCount: 'infinite', animationDelay: '0.2s'}}></span>
    </div>
  );
}

export default App;
