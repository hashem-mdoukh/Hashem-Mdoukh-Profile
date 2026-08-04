import type { ReactNode } from "react";
import { Kw, Fn, Str, Type, Num, Cm, Base, tok } from "@/components/ui/ProjectFrame";

/**
 * Short, representative snippets for each featured project's editor
 * cover — mirroring the real implementation highlights of each repo.
 */
export const projectSnippets: Record<string, { filename: string; code: ReactNode }> = {
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

  transportation: {
    filename: "app/api/buses/route.ts",
    code: (
      <span className={tok.base}>
        <Kw>export async function</Kw> <Fn>GET</Fn>
        <span className={tok.punc}>()</span> <span className={tok.punc}>{"{"}</span>
        {"\n  "}
        <Kw>const</Kw> buses<span className={tok.punc}>:</span> <Type>Bus</Type>
        <span className={tok.punc}>[]</span> <span className={tok.punc}>=</span>{" "}
        <Kw>await</Kw> <Fn>getLiveBuses</Fn>
        <span className={tok.punc}>();</span>
        {"\n\n  "}
        <Kw>return</Kw> NextResponse<span className={tok.punc}>.</span>
        <Fn>json</Fn>
        <span className={tok.punc}>({"{"}</span>
        {"\n    "}buses<span className={tok.punc}>,</span>{" "}
        <Cm>{"// live positions → Leaflet map"}</Cm>
        {"\n    "}updatedAt<span className={tok.punc}>:</span> Date
        <span className={tok.punc}>.</span>
        <Fn>now</Fn>
        <span className={tok.punc}>(),</span>
        {"\n  "}
        <span className={tok.punc}>{"}"});</span>
        {"\n"}
        <span className={tok.punc}>{"}"}</span>
      </span>
    ),
  },

  financial: {
    filename: "services/api.ts",
    code: (
      <span className={tok.base}>
        <Kw>export async function</Kw> <Fn>getCauses</Fn>
        <span className={tok.punc}>():</span> <Type>Promise</Type>
        <span className={tok.punc}>&lt;</span>
        <Type>Cause</Type>
        <span className={tok.punc}>[]&gt;</span> <span className={tok.punc}>{"{"}</span>
        {"\n  "}
        <Kw>const</Kw> res <span className={tok.punc}>=</span> <Kw>await</Kw>{" "}
        <Fn>fetch</Fn>
        <span className={tok.punc}>(</span>
        <Str>{"`${API_URL}/causes`"}</Str>
        <span className={tok.punc}>);</span>
        {"\n  "}
        <Kw>const</Kw> dto<span className={tok.punc}>:</span> <Type>CauseDto</Type>
        <span className={tok.punc}>[]</span> <span className={tok.punc}>=</span>{" "}
        <Kw>await</Kw> res<span className={tok.punc}>.</span>
        <Fn>json</Fn>
        <span className={tok.punc}>();</span>
        {"\n\n  "}
        <Kw>return</Kw> dto<span className={tok.punc}>.</span>
        <Fn>map</Fn>
        <span className={tok.punc}>(</span>
        <Base>toCause</Base>
        <span className={tok.punc}>);</span> <Cm>{"// DTO → domain"}</Cm>
        {"\n"}
        <span className={tok.punc}>{"}"}</span>
      </span>
    ),
  },
};
