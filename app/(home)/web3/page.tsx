import Link from "next/link";
import { SiSolana, SiEthereum } from "react-icons/si";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web3 & Blockchain Documentation - Dev Axioms",
  description: "Web3 and Blockchain Axioms covering Solana and Ethereum smart contract development and security architecture.",
};

export default function Web3Page() {
    const categories = [
        {
            title: "Solana",
            description: "Explore Solana architecture, Rust-based smart contract development, Anchor framework patterns, account model security, and transaction mechanics.",
            href: "/web3/solana",
            topicCount: "4 Topics",
            icon: <SiSolana className="w-5 h-5 text-purple-400" />,
            largeIcon: <SiSolana className="w-28 h-28" />,
        },
        {
            title: "Ethereum",
            description: "Master EVM architecture, Solidity smart contract optimization, gas mechanics, DeFi primitives, and web3 frontend integration.",
            href: "/web3/ethereum",
            topicCount: "5 Topics",
            icon: <SiEthereum className="w-5 h-5 text-blue-400" />,
            largeIcon: <SiEthereum className="w-28 h-28" />,
        }
    ];

    return (
        <div className="bg-background min-h-screen pb-20 pt-10">
            <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
                        Web3 & Blockchain
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                        Production-grade axioms for decentralized application developers. In-depth technical guides from Solana program state to EVM opcodes.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.href}
                            href={category.href}
                            className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/40 hover:bg-card hover:border-[#FF5A26]/30 p-5 transition-all shadow-sm flex flex-col justify-between space-y-4"
                        >
                            {/* Watermark Background Logo Effect */}
                            <div className="absolute -right-4 -bottom-4 text-foreground opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 pointer-events-none">
                                {category.largeIcon}
                            </div>

                            <div className="space-y-3 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 w-fit rounded-lg bg-muted/50 border border-border/40">
                                        {category.icon}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{category.topicCount}</span>
                                </div>

                                <h3 className="text-base font-semibold text-foreground group-hover:text-[#FF5A26] transition-colors tracking-tight">
                                    {category.title}
                                </h3>

                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                    {category.description}
                                </p>
                            </div>

                            <div className="pt-2 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
                                <span>Explore Axioms</span>
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#FF5A26]" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
