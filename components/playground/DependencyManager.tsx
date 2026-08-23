"use client";

import { useState, useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Search, Loader2, Plus, X } from "lucide-react";

export function DependencyManager() {
  const { sandpack } = useSandpack();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      setIsSearching(true);
      fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`)
        .then(r => r.json())
        .then(data => {
          setResults(data.objects || []);
          setIsSearching(false);
        })
        .catch(() => setIsSearching(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const getDeps = () => {
    try {
      const pkg = sandpack.files["/package.json"]?.code;
      if (pkg) {
        return Object.entries(JSON.parse(pkg).dependencies || {});
      }
    } catch(e) {}
    return [];
  };

  const addPackage = (pkgName: string, version: string = "latest") => {
    let pkg = sandpack.files["/package.json"]?.code;
    if (!pkg) pkg = JSON.stringify({ dependencies: {} });
    try {
      const parsed = JSON.parse(pkg);
      if (!parsed.dependencies) parsed.dependencies = {};
      parsed.dependencies[pkgName] = version;
      sandpack.updateFile("/package.json", JSON.stringify(parsed, null, 2));
      setQuery("");
      setResults([]);
    } catch(err) {
      console.error(err);
    }
  };

  const removePackage = (pkgName: string) => {
    let pkg = sandpack.files["/package.json"]?.code;
    if (!pkg) return;
    try {
      const parsed = JSON.parse(pkg);
      if (parsed.dependencies && parsed.dependencies[pkgName]) {
        delete parsed.dependencies[pkgName];
        sandpack.updateFile("/package.json", JSON.stringify(parsed, null, 2));
      }
    } catch(err) {}
  };

  const deps = getDeps();

  return (
    <div className="flex flex-col h-full bg-[#151515] text-white overflow-hidden">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground bg-[#1e1e1e] px-3 py-1.5 border-b border-[#333] font-semibold flex justify-between items-center shrink-0">
        <span>Dependencies</span>
      </div>
      
      <div className="p-2 shrink-0">
        <div className="relative">
          <Search className="absolute left-2 top-1.5 w-3 h-3 text-muted-foreground" />
          <input 
            type="text" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search npm..." 
            className="w-full bg-[#0a0a0a] border border-[#333] rounded px-6 py-1 text-[10px] text-white placeholder:text-muted-foreground focus:outline-none focus:border-[#FF5A26]"
          />
          {isSearching && <Loader2 className="absolute right-2 top-1.5 w-3 h-3 text-muted-foreground animate-spin" />}
        </div>
        
        {results.length > 0 && (
          <div className="mt-1 border border-[#333] rounded bg-[#1e1e1e] overflow-hidden max-h-32 overflow-y-auto z-10 relative">
            {results.map((r, i) => (
              <div key={i} className="flex justify-between items-center p-1.5 hover:bg-[#2a2a2a] group cursor-pointer" onClick={() => addPackage(r.package.name, r.package.version)}>
                <div className="flex flex-col truncate pr-2">
                  <span className="text-[10px] font-medium truncate">{r.package.name}</span>
                </div>
                <button className="shrink-0 text-muted-foreground group-hover:text-white transition-all">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {deps.length === 0 ? (
          <div className="text-[10px] text-muted-foreground text-center mt-2">No dependencies</div>
        ) : (
          <ul className="space-y-0.5">
            {deps.map(([name, version]: any) => (
              <li key={name} className="flex justify-between items-center text-[10px] p-1 hover:bg-[#1e1e1e] rounded group">
                <div className="flex flex-col truncate">
                  <span className="font-medium truncate text-gray-300 group-hover:text-white">{name}</span>
                </div>
                <button 
                  onClick={() => removePackage(name)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
