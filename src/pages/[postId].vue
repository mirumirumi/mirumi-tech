    <Body>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/components/prism-core.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.28.0/plugins/autoloader/prism-autoloader.min.js"></Script>
    </Body>
import Prism from "prismjs"
onMounted(() => {
  Prism.manual = true
  Prism.highlightAll()
})
