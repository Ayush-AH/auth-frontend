import { useState } from "react";
import toast from "react-hot-toast";

export default function RazorpayButton() {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      setLoading(false);
      return;
    }

    try {
      // Create order
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create/orderId`,
        { method: "POST" }
      );
      if (!orderRes.ok) {
        throw new Error(`Order creation failed: ${orderRes.status}`);
      }

      const orderData = await orderRes.json();

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Pome Heals",
        description: "Test Transaction",
        image: "https://example.com/your_logo.png",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                }),
              }
            );

            if (verifyRes.ok) {
              toast.success("Payment verified successfully");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            toast.error("An error occurred while verifying payment");
          }
        },
        prefill: {
          name: "Unknown User", // Replace with actual logged-in user name
          email: "",            // Replace with actual logged-in user email
          contact: "",          // Leave blank if no real number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#000",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.error(response.error);
        toast.error(`Payment Failed: ${response.error.description}`);
      });

      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handlePayment}
      className="w-full bg-black cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-black/90 transition duration-200"
    >
      {loading ? "Processing..." : "Subscribe to Audiobook"}
    </button>
  );
}
