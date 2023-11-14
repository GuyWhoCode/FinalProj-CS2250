"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/database/firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    UserCredential,
} from "firebase/auth";
import SignUp from "@/components/signup";
import { UserFormData, User, Artist } from "@/database/types";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const createNewUser = async ({
    email,
    password,
    artist,
    bio,
}: UserFormData): Promise<boolean> => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    try {
        const createdLoggedUser: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);
        let newUserInfo: User | Artist = {
            id: createdLoggedUser.user.uid,
            username: "",
            profilePicture: "",

        };    
        // Defaults new user info to regular user

        if (artist) {
            newUserInfo = {
                ...newUserInfo,
                bio: bio,
                reviews: 0,
            };
        }
        // Adds additional attributes to upgrade user to artist
        
        await addDoc(collection(db, "users"), newUserInfo);
        return true;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes("auth/email-already-in-use")) {
                alert("Error: Email already in use");
                return false;
            }
            alert(error.message);
        }
    }
    return false;
};

export default function Page() {
    const router = useRouter();

    const submitForm = async (formData: UserFormData) => {
        const result = await createNewUser(formData);
        if (result) {
            router.push("/");
        } else {
            alert("Error creating user");
        }
    };

    return (
        <main>
            <h1>Sign Up page!</h1>
            <SignUp submitForm={submitForm} />
            <Link href="/">Return Home</Link>
        </main>
    );
}
