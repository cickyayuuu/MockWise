"use client"; // Yeh directive hai jo Next.js ko batata hai ki yeh code client-side pe run hona chahiye.

import { z } from "zod"; // Zod library ko import kiya gaya hai jo validation ke liye use hoti hai.
import Link from "next/link"; // Next.js ka Link component import kiya gaya hai jo routing ke liye use hota hai.
import Image from "next/image"; // Next.js ka Image component import kiya gaya hai jo images ko efficiently render karta hai.
import { toast } from "sonner"; // "sonner" library ko import kiya gaya hai jo toast notifications ke liye use hoti hai.
import { auth } from "@/firebase/client"; // Firebase authentication ko import kiya gaya hai.
import { useForm } from "react-hook-form"; // React Hook Form ka use kiya gaya hai form ko manage karne ke liye.
import { useRouter } from "next/navigation"; // Next.js ka useRouter hook import kiya gaya hai jo page navigation ke liye use hota hai.
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver ko import kiya gaya hai jo Zod validation ko react-hook-form ke saath integrate karta hai.

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Firebase se sign up aur sign-in functions import kiye gaye hain.

import { Form } from "@/components/ui/form"; // Custom Form component ko import kiya gaya hai.
import { Button } from "@/components/ui/button"; // Custom Button component ko import kiya gaya hai.

import { signIn, signUp } from "@/lib/actions/auth.action"; // signIn aur signUp functions ko import kiya gaya hai jo user authentication handle karte hain.
import FormField from "./FormFeild"; // Custom FormField component ko import kiya gaya hai jo form inputs ko manage karta hai.

const authFormSchema = (type: FormType) => { // authFormSchema function ko define kiya gaya hai jo form ki validation schema create karta hai.
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(), // Agar type "sign-up" hai toh name required hoga, warna optional.
    email: z.string().email(), // Email ko valid email format mein hona chahiye.
    password: z.string().min(3), // Password ki length kam se kam 3 characters honi chahiye.
  });
};

const AuthForm = ({ type }: { type: FormType }) => { // AuthForm component ko define kiya gaya hai jo sign-up ya sign-in form render karta hai.
  const router = useRouter(); // useRouter hook se router object ko initialize kiya gaya hai jo page navigation handle karega.

  const formSchema = authFormSchema(type); // authFormSchema ko call karke form ke liye schema generate kiya gaya hai.
  const form = useForm<z.infer<typeof formSchema>>({ // useForm hook ko use kiya gaya hai form ke state aur validation ko manage karne ke liye.
    resolver: zodResolver(formSchema), // Zod validation ko react-hook-form ke saath integrate karne ke liye zodResolver use kiya gaya hai.
    defaultValues: { // Form ke default values set kiye gaye hain.
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => { // onSubmit function define kiya gaya hai jo form submit hone par call hoga.
    try {
      if (type === "sign-up") { // Agar type "sign-up" hai toh user ko sign-up karenge.
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ); // Firebase se user create karte hain.

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message); // Agar sign-up fail hota hai toh error toast dikhate hain.
          return;
        }

        toast.success("Account created successfully. Please sign in."); // Agar sign-up successful hota hai toh success message dikhate hain.
        router.push("/sign-in"); // User ko sign-in page par redirect karte hain.
      } else { // Agar type "sign-in" hai toh user ko sign-in karenge.
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ); // Firebase se user ko sign-in karte hain.

        const idToken = await userCredential.user.getIdToken(); // User ka idToken generate karte hain.
        if (!idToken) {
          toast.error("Sign in Failed. Please try again."); // Agar idToken generate nahi hota hai toh error message dikhate hain.
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully."); // Agar sign-in successful hota hai toh success message dikhate hain.
        router.push("/"); // User ko home page par redirect karte hain.
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`); // Agar kisi bhi step pe error hota hai toh toast dikhate hain.
    }
  };

  const isSignIn = type === "sign-in"; // "sign-in" type hone par isSignIn true hoga, warna false.

  return (
    <div className="card-border lg:min-w-[566px]"> 
      <div className="flex flex-col gap-6 card py-14 px-10"> 
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2> 
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}> 
          <form
            onSubmit={form.handleSubmit(onSubmit)} // onSubmit ko handle karne ke liye handleSubmit ko call kiya gaya hai.
            className="w-full space-y-6 mt-4 form" // Form styling ki gayi hai.
          >
            {!isSignIn && ( // Agar sign-up form hai toh name field show hoga.
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"} 
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm; // AuthForm component ko export kiya gaya hai.
