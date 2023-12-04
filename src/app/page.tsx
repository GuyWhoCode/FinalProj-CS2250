import { Input } from "@/components/ui/input";
import HomepageCommission from "@/components/homepageCommission";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavItem from "@/components/ui/navItem";
import {
    Bookmark,
    Home,
    MessageCircle,
    PlusCircle,
    UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/database/firebase";
import { collection, query, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { Commission } from "@/database/types";

const FetchCommissions = async () => {
    const test: Commission[] = [];
    const commRef = collection(db, "commissions");
    await getDocs(commRef).then((res) => {
        res.docs.forEach((doc) => {
            const data = doc.data();
            test.push({
                userId: data.userId,
                title: data.title,
                price: data.price,
                image: data.image,
                timesBought: data.timesBought,
                description: data.description,
                categories: data.categories,
                keywords: data.keywords,
                reviews: data.reviews,
            });
        });
    });
    const pfpUrlPlaceholder =
        "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=t-kEFO4r0oEAX8dCX0N&_nc_ht=scontent-sjc3-1.xx&oh=00_AfDDGu1dOSs-m8ToepSFqE3SCwGCN2ypyZgHjtUvibf2tQ&oe=6576618E";
    return (
        <div className="grid grid-cols-2 gap-4 px-2">
            {test.map((commission, index) => (
                <HomepageCommission
                    key={index}
                    // imgSrc={commission.image}
                    imgSrc={pfpUrlPlaceholder}
                    userName={commission.userId}
                    price={String(commission.price)}
                    title={commission.title}
                    profilePicture={pfpUrlPlaceholder}
                    numBought={String(commission.timesBought)}
                />
            ))}
        </div>
    );
};

const MobileNavbar = () => {
    return (
        <NavigationMenu className="bg-[#F46767] p-2 mt-0 fixed max-w-none w-full z-10 bottom-0 md:hidden">
            <NavigationMenuList className="text-slate-50 grid grid-cols-5 items-center">
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center"
                >
                    <Home size={48} />
                    Home
                </Link>
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center"
                >
                    <Bookmark size={48} />
                    Saved
                </Link>
                <Link
                    href="/new-commission"
                    className="flex flex-col items-center justify-center"
                >
                    <PlusCircle size={48} />
                </Link>
                <Link
                    href="/messaging"
                    className="flex flex-col items-center justify-center"
                >
                    <MessageCircle size={48} />
                    Messages
                </Link>
                <Link
                    href="/profile"
                    className="flex flex-col items-center justify-center"
                >
                    <UserCircle2 size={48} />
                    Account
                </Link>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
const DesktopNavbar = () => {
    return (
        <NavigationMenu className="bg-[#F46767] p-2 mt-0 fixed max-w-none w-full z-10 top-0 justify-center md:flex hidden">
            <NavigationMenuList>
                <NavItem itemName="Profile" path="/profile" />
                <NavItem itemName="Sign Up" path="/signup" />
                <NavItem itemName="Login" path="/login" />
                <NavItem itemName="Messaging" path="/messaging" />
                <NavItem itemName="Chatting" path="/chatting" />
                <NavItem itemName="New Commission" path="/new-commission" />
                <NavItem itemName="Cloudinary Setup" path="/cloudinary-setup" />
            </NavigationMenuList>
        </NavigationMenu>
    );
};
export default function Page() {
    const pfpUrlPlaceholder =
        "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=be3454&_nc_ohc=t-kEFO4r0oEAX8dCX0N&_nc_ht=scontent-sjc3-1.xx&oh=00_AfDDGu1dOSs-m8ToepSFqE3SCwGCN2ypyZgHjtUvibf2tQ&oe=6576618E";
    return (
        <main>
            <DesktopNavbar />
            <MobileNavbar />
            <div className="flex flex-col items-center justify-center py-[60px] min-w-[320px]">
                <h1 className="pb-4 text-5xl font-bold">Discovery page</h1>
                <Input className=" max-w-[480px] mb-3 " placeholder="Search" />
                <FetchCommissions />
            </div>
        </main>
    );
}
