import { AuthValidator } from "../../components/AuthValidator/AuthValidator"
import { Navigation } from "../../components/Navigation/Navigation"

export const About = () => (
  <AuthValidator>
    <div>
      <Navigation></Navigation>
      <h1>About</h1>
    </div>
  </AuthValidator>
)