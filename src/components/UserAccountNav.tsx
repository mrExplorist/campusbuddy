"use client";

import { Activity, ArrowUpWideNarrow, BookOpen, Briefcase, Compass, Crown, FilePlus, Heart, HeartHandshake, HelpingHand, Newspaper, Package, Rocket, Settings, UserCog, User as UserIcon } from "lucide-react";
import { Github, Library } from "lucide-react";
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetTrigger } from "./ui/sheet";

import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { User } from "next-auth";
import UserAvatar from "./UserAvatar";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
    user: Pick<User, "name" | "image" | "email">;
    username: string | null | undefined;
    isUserPremium: boolean;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user, username, isUserPremium }) => {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <div className="flex-shrink-0 md:block md:flex-shrink-0 md:items-center gap-4 justify-center items-center ml-2">

            <div className="text-gray-200 mr-4">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <div className="flex items-center justify-center p-1 rounded-lg transition-all duration-300 ease-in-out cursor-pointer  ">


                            <div className="relative flex items-center mr-3 border rounded-xl border-zinc-800 py-2 px-2">

                                <UserAvatar
                                    className="md:h-10 md:w-10 h-7 w-7 "
                                    user={{
                                        name: user.name || null,
                                        image: user.image || undefined,
                                    }}
                                />


                            </div>

                        </div>
                    </SheetTrigger>
                    <SheetContent className="w-[240px] md:w-[400px]  bg-[#1B1F23] text-gray-200 border border-gray-600 rounded-l-2xl p-4 text-xs md:text-sm overflow-hidden data-[state=closed]:animate-out">
                        <div className="space-y-[2.2px] md:space-y-1">

                            {/* Navigation links */}
                            {[
                                { href: `/u/${username}`, icon: UserIcon, label: "Your Profile" },
                                { href: "/dashboard", icon: UserCog, label: "Dashboard" },
                                { href: "/feed", icon: Activity, label: "Your Feed" },
                                { href: "/launchpad/new-product", icon: Icons.rabbit, label: "Submit a Product" },
                                { href: "/launchpad/my-products", icon: Package, label: "My Products" },
                                { href: "/launchpad/my-upvoted", icon: Heart, label: "Your Upvoted Products" },
                                { href: "/launchpad/settings", icon: Settings, label: "Settings" },
                                { href: "/network", icon: HeartHandshake, label: "Professional Network" },
                                { href: "/jobs/new", icon: FilePlus, label: "Post an Opportunity" },
                                { href: "/opportunities", icon: Compass, label: "Browse Opportunities" },
                                // { href: "/opportunities", icon: Briefcase, label: "Opportunities / OS Programs" },
                                { href: "/feed/blogs", icon: Library, label: "Free Resources and Tools" },
                                // { href: "/articles/categories/all", icon: Newspaper, label: "Articles" },
                                { href: "/launchpad", icon: Rocket, label: "Creator Launchpad" },
                                { href: "/startups/catalog/feeds", icon: BookOpen, label: "Feed Reader / startup catalog" },
                                { href: "/startups/catalog/workatstartups", icon: Briefcase, label: "Work At Startups" },
                                { href: "/startups/catalog/jobstimeline", icon: Activity, label: "Jobs Timeline" },
                                {
                                    href: "/startups/catalog/crunchbase-feed",
                                    icon: Compass,
                                    label: "Crunchbase Feed"


                                },
                                { href: "/startups/catalog/topstories", icon: ArrowUpWideNarrow, label: "Top Stories" },
                                { href: "/startups/catalog/phfeed", icon: Newspaper, label: "Feed Importer(Product Hunt)" },

                            ].map((item, index) => (
                                <React.Fragment key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center p-2 rounded-md transition-all duration-300 ease-in-out gap-2"
                                        )}
                                        onClick={handleLinkClick}
                                    >
                                        <item.icon size={22} />
                                        <span>{item.label}</span>
                                    </Link>


                                    {index === 2 || index === 6 || index === 9 ? (
                                        <Separator className="bg-gray-700 my-4" />

                                    ) : null}
                                    {
                                        index === 2 && (
                                            <SheetDescription className="text-xs my-2">
                                                Launchpad Section
                                            </SheetDescription>
                                        )
                                    }
                                    {index === 6 || index === 9 ? (
                                        <SheetDescription className="text-xs my-2">
                                            {index === 6 ? "Professional Connections and get Mentorship" : "Catalog and Archives to get you inspired"}
                                        </SheetDescription>
                                    ) : null}

                                </React.Fragment>
                            ))}

                            <Separator className="bg-gray-700 " />

                            <SheetFooter>
                                <div
                                    className="cursor-pointer justify-end bottom-0 my-auto left-0 flex-grow"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setOpen(false);
                                        signOut({
                                            callbackUrl: `${window.location.origin}/`,
                                        });
                                    }}
                                >
                                    Sign Out
                                </div>
                                {/* Premium Membership */}
                                {isUserPremium ? (
                                    <div className="flex items-center gap-2  w-fit p-2 rounded-md ">
                                        <Crown size={22} className="text-yellow-400" />
                                        <span>Premium Member</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 p-2 rounded-md bg-gray-700">
                                        <Rocket size={22} />
                                        <span>Upgrade to Premium</span>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Link
                                        href="https://github.com/lalitdotdev/devcastle"
                                        className={cn("flex items-center p-2 rounded-md transition-all duration-300 ease-in-out gap-2 hover:text-blue-800")}
                                        onClick={handleLinkClick}
                                    >
                                        <Github size={24} />
                                    </Link>
                                    <Link
                                        href=""
                                        className={cn("flex items-center p-2 rounded-md transition-all duration-300 ease-in-out gap-2 hover:text-blue-800")}
                                        onClick={handleLinkClick}
                                    >
                                        <HelpingHand size={26} />
                                    </Link>
                                </div>
                            </SheetFooter>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div >
    );
};

export default UserAccountNav;
