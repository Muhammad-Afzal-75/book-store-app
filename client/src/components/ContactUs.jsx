import React from "react";
import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
    alert("Thank you! Your message has been sent.");
  };

  return (
    <section className="bg-base-100 py-16 px-4">
      <div className="max-w-5xl mx-auto bg-base-200 shadow-lg rounded-2xl p-8 md:p-12">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-base-content mb-6">
          Contact <span className="text-primary">Us</span>
        </h2>
        <p className="text-base-content/70 mb-8">
          Have questions or feedback? Fill out the form below and we’ll get back to you
          as soon as possible.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-2 text-base-content">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={`w-full border rounded-lg px-4 py-3 bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.name ? "border-red-500" : "border-base-300"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2 text-base-content">Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              className={`w-full border rounded-lg px-4 py-3 bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.email ? "border-red-500" : "border-base-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block font-medium mb-2 text-base-content">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="5"
              className={`w-full border rounded-lg px-4 py-3 bg-base-100 text-base-content focus:ring-2 focus:ring-primary focus:outline-none ${
                errors.message ? "border-red-500" : "border-base-300"
              }`}
              {...register("message", { required: "Message is required" })}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
