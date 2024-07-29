"use client";

// @ts-expect-error No types file exist for this package
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export const Chatbot = () => {
  return (
    <TawkMessengerReact
      propertyId={process.env.NEXT_PUBLIC_TAWKTO_CHATBOT_PROPERTY_ID}
      widgetId="default"
    />
  );
};
