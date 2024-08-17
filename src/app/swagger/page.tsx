import { getApiDocs } from "@external/lib/swagger"
import ReactSwagger from "@presentation/components/ReactSwagger/ReactSwagger"

export default async function IndexPage() {
  const spec = await getApiDocs()
  return (
    <section>
      <ReactSwagger spec={spec} />
    </section>
  )
}
