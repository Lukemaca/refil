import ConsumerHomePage from "./components/ConsumerHomePage"
import BrokerHomePage from "./components/BrokerHomePage"

export default function HomePage() {
  // For now, we'll show the consumer version
  // In a real app, you might determine this based on user type, URL params, etc.
  const userType = "consumer" // or "broker"

  if (userType === "broker") {
    return <BrokerHomePage />
  }

  return <ConsumerHomePage />
}
