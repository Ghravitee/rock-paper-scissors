import { useState, useEffect } from "react";
import paper from "./images/icon-paper.svg";
import rock from "./images/icon-rock.svg";
import scissors from "./images/icon-scissors.svg";
import rules from "./images/image-rules.svg";
import iconClose from "./images/icon-close.svg";

const choices = [
  {
    name: "paper",
    image: paper,
    border: "border-Blue-500",
    shadow:
      "shadow-[0_5px_0_0_rgba(42,70,192,1)] lg:shadow-[0_8px_0_0_rgba(42,70,192,1)]",
    position: "absolute lg:-top-16 -left-[1rem] -top-[1.7rem] lg:left-[1rem]",
  },
  {
    name: "scissors",
    image: scissors,
    border: "border-Gold-500",
    shadow:
      "shadow-[0_5px_0_0_rgba(197,107,27,1)] lg:shadow-[0_8px_0_0_rgba(197,107,27,1)]",
    position: "absolute lg:-top-16 -right-[1rem] -top-[1.7rem] lg:right-[1rem]",
  },
  {
    name: "rock",
    image: rock,
    border: "border-Red-600",
    shadow:
      "shadow-[0_5px_0_0_rgba(156,22,51,1)] lg:shadow-[0_8px_0_0_rgba(156,22,51,1)]",
    position:
      "absolute lg:bottom-0 bottom-4 left-1/2 -translate-x-1/2 translate-y-[20%] lg:translate-y-[30%]",
  },
];

const App = () => {
  const [showRules, setShowRules] = useState(false);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("rps-score");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("rps-score", score.toString());
  }, [score]);

  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // --- pick handler ---
  const handlePick = (choice: string) => {
    setUserChoice(choice);
    setLoading(true);
    setResult(null);

    // simulate computer thinking
    setTimeout(() => {
      const comp = choices[Math.floor(Math.random() * choices.length)].name;
      setComputerChoice(comp);
      setLoading(false);
      decideWinner(choice, comp);
    }, 1500);
  };

  // --- winner logic ---
  const decideWinner = (user: string, comp: string) => {
    if (user === comp) {
      setResult("draw");
      return;
    }

    if (
      (user === "rock" && comp === "scissors") ||
      (user === "paper" && comp === "rock") ||
      (user === "scissors" && comp === "paper")
    ) {
      setResult("win");
      setScore((prev) => prev + 1);
    } else {
      setResult("lose");
      setScore((prev) => Math.max(prev - 1, 0));
    }
  };

  // --- reset game ---
  const playAgain = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setLoading(false);
  };

  const getChoiceData = (name: string | null) =>
    choices.find((c) => c.name === name);

  return (
    <main className="lg:py-10 pb-16 px-4 min-h-screen relative flex flex-col ">
      <section className="flex-1 w-full">
        {/* Title and Score */}
        <div className="max-w-[650px] mx-auto  py-4 pr-4 pl-6 border-[3px] border-white/50 rounded-xl flex justify-between items-center relative z-20">
          <div>
            {["Rock", "Paper", "Scissors"].map((t) => (
              <h1
                key={t}
                className="uppercase font-bold lg:text-4xl text-2xl text-white leading-[.8]"
              >
                {t}
              </h1>
            ))}
          </div>
          <div className="bg-white flex flex-col items-center justify-center lg:px-10 px-6 lg:py-3 py-2 rounded-md">
            <h2 className="text-Blue-700 uppercase font-semibold tracking-widest">
              Score
            </h2>
            <p className="lg:text-[4rem] text-[3rem] font-bold text-Gray-600 leading-[.8]">
              {score}
            </p>
          </div>
        </div>

        {/* Game Board */}
        <div
          className={`${
            result || loading ? "lg:mt-[2rem]" : "mt-[5rem] lg:mt-[8rem]"
          } mt-[2rem]`}
        >
          {!userChoice ? (
            <div className="relative triangle lg:w-[60%] w-[60%] mx-auto h-[200px] max-w-[300px] lg:max-w-[400px]">
              {choices.map((choice) => (
                <button
                  key={choice.name}
                  onClick={() => handlePick(choice.name)}
                  className={`${choice.position}`}
                >
                  <div
                    className={`
          lg:size-[9rem] size-[6rem]
          rounded-full 
          lg:border-[1.2rem] border-[.8rem]
          ${choice.border}
          flex items-center justify-center
          ${choice.shadow}
        `}
                  >
                    <div className="bg-white lg:size-[6.7rem] size-[4.5rem] rounded-full flex border-t-[.4rem] border-gray-300 items-center justify-center">
                      <img
                        src={choice.image}
                        alt={choice.name}
                        className="lg:size-10 size-8"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex items-center justify-center mt-10 gap-4 max-w-[1200px] mx-auto">
                {/* User Pick */}
                <div className="flex flex-col-reverse lg:flex-col gap-4 relative z-20">
                  <h2 className="uppercase font-bold text-white tracking-widest text-[1rem] lg:text-[1.5rem] text-center relative z-20">
                    You Picked
                  </h2>
                  <div className="relative flex items-center justify-center">
                    {result === "win" && <div className="winner-glow"></div>}
                    <div
                      className={`lg:size-[17rem] size-[8rem] 
              rounded-full 
              lg:border-[1.8rem] border-[1rem] relative z-10 ${
                getChoiceData(userChoice)?.border
              } flex items-center justify-center ${
                        getChoiceData(userChoice)?.shadow
                      }`}
                    >
                      <div
                        className="bg-white lg:size-[14rem] size-[6rem] 
                rounded-full 
                lg:border-t-[.5rem] border-t-[.3rem] border-gray-300 flex items-center justify-center relative z-10"
                      >
                        <img
                          src={getChoiceData(userChoice)?.image}
                          alt={userChoice ?? ""}
                          className="lg:size-[5rem] size-[3rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Result */}
                <div
                  className={`lg:flex flex-col items-center hidden gap-4 relative z-20 ${
                    loading ? "" : "px-16"
                  }`}
                >
                  {loading ? (
                    <p className="text-white uppercase font-semibold hidden"></p>
                  ) : (
                    <>
                      <p className="text-white text-[3rem] font-bold uppercase">
                        {result === "win"
                          ? "You Win"
                          : result === "lose"
                          ? "You Lose"
                          : "Draw"}
                      </p>
                      <button
                        onClick={playAgain}
                        className="bg-white text-Navy-900 hover:text-Red-600 transition-all duration-300 px-6 py-2 rounded-lg font-semibold uppercase tracking-widest w-full"
                      >
                        Play Again
                      </button>
                    </>
                  )}
                </div>
                {/* Computer Pick */}
                {/* Computer Pick */}
                <div className="flex flex-col-reverse lg:flex-col items-center gap-6">
                  <h2 className="uppercase font-bold text-white tracking-widest text-[1rem] lg:text-[1.5rem] text-center relative z-20">
                    The House Picked
                  </h2>
                  {loading ? (
                    // loader circle
                    <div className="lg:size-[17rem] size-[8rem] rounded-full bg-Navy-900 flex items-center justify-center">
                      <div className="bg-Blue-900 size-[6.7rem] rounded-full" />
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center">
                      {result === "lose" && <div className="winner-glow"></div>}
                      <div
                        className={`lg:size-[17rem] size-[8rem] 
              rounded-full 
              lg:border-[1.8rem] border-[1rem] relative z-20 ${
                getChoiceData(computerChoice)?.border
              } flex items-center justify-center ${
                          getChoiceData(computerChoice)?.shadow
                        }`}
                      >
                        <div
                          className="bg-white lg:size-[14rem] size-[6rem] 
                rounded-full 
                lg:border-t-[.5rem] border-t-[.3rem] border-gray-300 flex items-center justify-center relative z-10"
                        >
                          <img
                            src={getChoiceData(computerChoice)?.image}
                            alt={computerChoice ?? ""}
                            className="lg:size-[5rem] size-[3rem]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/*  */}
              <div
                className={`flex flex-col items-center gap-2 lg:hidden relative z-20 mt-6 ${
                  loading ? "" : "px-16"
                }`}
              >
                {loading ? (
                  <p className="text-white uppercase font-semibold hidden"></p>
                ) : (
                  <>
                    <p className="text-white text-[2.5rem] lg:text-[3rem] font-bold uppercase">
                      {result === "win"
                        ? "You Win"
                        : result === "lose"
                        ? "You Lose"
                        : "Draw"}
                    </p>
                    <button
                      onClick={playAgain}
                      className="bg-white text-Navy-900 hover:text-Red-600 transition-all duration-300 px-4 py-2 rounded-lg font-semibold uppercase tracking-widest w-full"
                    >
                      Play Again
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="flex justify-end p-4 mt-auto">
        <button
          onClick={() => setShowRules(true)}
          className="tracking-widest text-sm uppercase font-semibold flex items-center justify-center border border-white rounded-lg px-8 py-2 text-white"
        >
          Rules
        </button>
      </section>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white lg:p-6 px-4 py-4 rounded-lg shadow-lg max-w-[25rem] w-[90%] relative">
            <div className="flex items-center justify-between mb-8 ">
              <h2 className="text-2xl font-bold text-Gray-600 uppercase mx-auto lg:m-0">
                Rules
              </h2>
              <button
                onClick={() => setShowRules(false)}
                className="text-Gray-600 text-xl font-bold"
              >
                <img src={iconClose} alt="" className="hidden lg:block" />
              </button>
            </div>

            <button onClick={() => setShowRules(false)} className="">
              <img
                src={iconClose}
                alt=""
                className="block lg:hidden absolute left-0 right-0 bottom-2 mx-auto cursor-pointer"
              />
            </button>
            <img src={rules} alt="Game Rules" className="mx-auto mb-6" />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
