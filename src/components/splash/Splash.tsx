const COMMAND = "npx hashem@latest";

const LINES = [
  { label: "resolving theme", value: null },
  { label: "loading fonts", value: "JetBrains Mono · Inter" },
  { label: "mounting sections", value: "5" },
  { label: "hydrating", value: "react 19" },
] as const;

export function Splash() {
  return (
    <div id="splash">
      <button id="splash-skip" type="button" className="splash__skip">
        Skip intro
      </button>
      
      <p id="splash-status" role="status" className="sr-only">
        Loading.
      </p>

      <div className="splash__inner" aria-hidden="true">
        <p className="splash__boot">hashem@portfolio</p>

        <ul className="splash__log">
          {LINES.map((line, i) => (
            <li
              key={line.label}
              className="splash__row"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="splash__tick">&#9656;</span>
              <span className="splash__label">{line.label}</span>
              <span className="splash__dots" />
              {/* no value => the theme row, which CSS fills from data-theme,
                  so the line reports what actually resolved */}
              <span className={line.value ? "splash__value" : "splash__theme"}>
                {line.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="splash__rule">
          <span className="splash__rule-fill" />
        </div>

        <p className="splash__cmd">
          <span className="splash__prompt">&#10095;</span>
          <span className="splash__typed" style={{ "--n": COMMAND.length } as React.CSSProperties}>
            {COMMAND}
          </span>
        </p>
      </div>
    </div>
  );
}
