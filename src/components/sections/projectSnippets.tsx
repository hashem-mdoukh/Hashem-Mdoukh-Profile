import type { ReactNode } from "react";
import { Kw, Fn, Str, Type, Num, Cm, Base, tok } from "@/components/ui/ProjectFrame";

/**
 * Short, representative snippets for each featured project's editor
 * cover — mirroring the real implementation highlights of each repo.
 */
export const projectSnippets: Record<string, { filename: string; code: ReactNode }> = {
  resumax: {
    filename: "pdf/puppeteer-resume-pdf.generator.ts",
    code: (
      <span className={tok.base}>
        <Kw>class</Kw> <Type>ConcurrencyGate</Type> <span className={tok.punc}>{"{"}</span>
        {"\n  "}
        <Kw>async</Kw> <Fn>run</Fn>
        <span className={tok.punc}>&lt;</span>
        <Type>T</Type>
        <span className={tok.punc}>&gt;(</span>op<span className={tok.punc}>: () =&gt;</span>{" "}
        <Type>Promise</Type>
        <span className={tok.punc}>&lt;</span>
        <Type>T</Type>
        <span className={tok.punc}>&gt;)</span> <span className={tok.punc}>{"{"}</span>
        {"\n    "}
        <Kw>if</Kw> <span className={tok.punc}>(</span>
        <Kw>this</Kw>
        <span className={tok.punc}>.</span>active <span className={tok.punc}>&gt;=</span>{" "}
        <Kw>this</Kw>
        <span className={tok.punc}>.</span>limit<span className={tok.punc}>)</span>{" "}
        <Cm>{"// cap parallel PDF renders"}</Cm>
        {"\n      "}
        <Kw>await new</Kw> <Type>Promise</Type>
        <span className={tok.punc}>((</span>r<span className={tok.punc}>) =&gt;</span>{" "}
        <Kw>this</Kw>
        <span className={tok.punc}>.</span>waiting<span className={tok.punc}>.</span>
        <Fn>push</Fn>
        <span className={tok.punc}>(</span>r<span className={tok.punc}>));</span>
        {"\n    "}
        <Kw>this</Kw>
        <span className={tok.punc}>.</span>active <span className={tok.punc}>+=</span>{" "}
        <Num>1</Num>
        <span className={tok.punc}>;</span>
        {"\n    "}
        <Kw>try</Kw> <span className={tok.punc}>{"{"}</span> <Kw>return await</Kw>{" "}
        <Fn>op</Fn>
        <span className={tok.punc}>(); {"}"}</span>
        {"\n    "}
        <Kw>finally</Kw> <span className={tok.punc}>{"{"}</span> <Kw>this</Kw>
        <span className={tok.punc}>.</span>active <span className={tok.punc}>-=</span>{" "}
        <Num>1</Num>
        <span className={tok.punc}>;</span> <Kw>this</Kw>
        <span className={tok.punc}>.</span>waiting<span className={tok.punc}>.</span>
        <Fn>shift</Fn>
        <span className={tok.punc}>()?.(); {"}"}</span>
        {"\n  "}
        <span className={tok.punc}>{"}"}</span>
        {"\n"}
        <span className={tok.punc}>{"}"}</span>
      </span>
    ),
  },

  imagine: {
    filename: "chrome/OrbitNav.tsx",
    code: (
      <span className={tok.base}>
        <Cm>{"// the logo's ring is the progress bar"}</Cm>
        {"\n"}
        <Kw>const</Kw> <span className={tok.punc}>{"{"}</span> scrollYProgress{" "}
        <span className={tok.punc}>{"}"}</span> <span className={tok.punc}>=</span>{" "}
        <Fn>useScroll</Fn>
        <span className={tok.punc}>();</span>
        {"\n"}
        <Kw>const</Kw> progress <span className={tok.punc}>=</span> <Fn>useSpring</Fn>
        <span className={tok.punc}>(</span>scrollYProgress<span className={tok.punc}>,</span>{" "}
        <span className={tok.punc}>{"{"}</span>
        {"\n  "}stiffness<span className={tok.punc}>:</span> <Num>120</Num>
        <span className={tok.punc}>,</span> damping<span className={tok.punc}>:</span>{" "}
        <Num>28</Num>
        <span className={tok.punc}>,</span> mass<span className={tok.punc}>:</span>{" "}
        <Num>0.4</Num>
        <span className={tok.punc}>,</span>
        {"\n"}
        <span className={tok.punc}>{"}"});</span>
        {"\n\n"}
        <Kw>const</Kw> dash <span className={tok.punc}>=</span> <Fn>useTransform</Fn>
        <span className={tok.punc}>(</span>progress<span className={tok.punc}>,</span>{" "}
        <span className={tok.punc}>(</span>p<span className={tok.punc}>) =&gt;</span>
        {"\n  "}
        <Str>{"`${p * CIRC} ${CIRC}`"}</Str>
        <span className={tok.punc}>);</span> <Cm>{"// gold arc fills"}</Cm>
        {"\n"}
        <Kw>const</Kw> angle <span className={tok.punc}>=</span> <Fn>useTransform</Fn>
        <span className={tok.punc}>(</span>progress<span className={tok.punc}>,</span>{" "}
        <span className={tok.punc}>[</span>
        <Num>0</Num>
        <span className={tok.punc}>,</span> <Num>1</Num>
        <span className={tok.punc}>],</span> <span className={tok.punc}>[</span>
        <Num>0</Num>
        <span className={tok.punc}>,</span> <Num>360</Num>
        <span className={tok.punc}>]);</span>
      </span>
    ),
  },

  rickmorty: {
    filename: "useQueries.ts",
    code: (
      <span className={tok.base}>
        <Kw>export function</Kw> <Fn>useCharacters</Fn>
        <span className={tok.punc}>(</span>filters<span className={tok.punc}>:</span>{" "}
        <Type>CharacterFilters</Type>
        <span className={tok.punc}>)</span> <span className={tok.punc}>{"{"}</span>
        {"\n  "}
        <Kw>return</Kw> <Fn>useQuery</Fn>
        <span className={tok.punc}>({"{"}</span>
        {"\n    "}queryKey<span className={tok.punc}>:</span>{" "}
        <span className={tok.punc}>[</span>
        <Str>&quot;characters&quot;</Str>
        <span className={tok.punc}>,</span> filters<span className={tok.punc}>],</span>
        {"\n    "}queryFn<span className={tok.punc}>:</span>{" "}
        <span className={tok.punc}>() =&gt;</span> api<span className={tok.punc}>.</span>
        <Fn>getCharacters</Fn>
        <span className={tok.punc}>(</span>filters<span className={tok.punc}>),</span>
        {"\n    "}staleTime<span className={tok.punc}>:</span> <Num>5</Num>{" "}
        <span className={tok.punc}>*</span> <Num>60_000</Num>
        <span className={tok.punc}>,</span> <Cm>{"// dedupe + cache"}</Cm>
        {"\n    "}placeholderData<span className={tok.punc}>:</span>{" "}
        <Base>keepPreviousData</Base>
        <span className={tok.punc}>,</span>
        {"\n  "}
        <span className={tok.punc}>{"}"});</span>
        {"\n"}
        <span className={tok.punc}>{"}"}</span>
      </span>
    ),
  },

  weather: {
    filename: "useWeather.ts",
    code: (
      <span className={tok.base}>
        <Kw>export const</Kw> <Base>unitAtom</Base> <span className={tok.punc}>=</span>{" "}
        <Fn>atom</Fn>
        <span className={tok.punc}>&lt;</span>
        <Str>&quot;C&quot;</Str> <span className={tok.punc}>|</span> <Str>&quot;F&quot;</Str>
        <span className={tok.punc}>&gt;(</span>
        <Str>&quot;C&quot;</Str>
        <span className={tok.punc}>);</span>
        {"\n\n"}
        <Kw>export function</Kw> <Fn>useWeather</Fn>
        <span className={tok.punc}>(</span>city<span className={tok.punc}>:</span>{" "}
        <Type>string</Type>
        <span className={tok.punc}>)</span> <span className={tok.punc}>{"{"}</span>
        {"\n  "}
        <Kw>const</Kw> <span className={tok.punc}>[</span>unit
        <span className={tok.punc}>]</span> <span className={tok.punc}>=</span>{" "}
        <Fn>useAtom</Fn>
        <span className={tok.punc}>(</span>unitAtom<span className={tok.punc}>);</span>
        {"\n  "}
        <Kw>const</Kw> <span className={tok.punc}>{"{"}</span> data{" "}
        <span className={tok.punc}>{"}"}</span> <span className={tok.punc}>=</span>{" "}
        <Fn>useQuery</Fn>
        <span className={tok.punc}>({"{"}</span> queryKey<span className={tok.punc}>:</span>{" "}
        <span className={tok.punc}>[</span>
        <Str>&quot;weather&quot;</Str>
        <span className={tok.punc}>,</span> city<span className={tok.punc}>]</span>{" "}
        <span className={tok.punc}>{"}"});</span>
        {"\n  "}
        <Kw>return</Kw> <Fn>toUnit</Fn>
        <span className={tok.punc}>(</span>data<span className={tok.punc}>,</span> unit
        <span className={tok.punc}>);</span> <Cm>{"// K → °C/°F"}</Cm>
        {"\n"}
        <span className={tok.punc}>{"}"}</span>
      </span>
    ),
  },
};
