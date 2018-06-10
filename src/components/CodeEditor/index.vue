<template>
  <div class="code-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
export default {
  name: 'codeEditor',
  data() {
    return {
      codeEditor: false
    }
  },
  props: ['value'],
  watch: {
    value(value) {
      const editor_value = this.codeEditor.getValue()
      if (value !== editor_value) {
        this.codeEditor.setValue(this.value)
      }
    }
  },
  mounted() {
    this.codeEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'text/x-python',
      gutters: ['CodeMirror-lint-markers'],
      theme: 'rubyblue',
      lint: true
    })
    this.codeEditor.setValue(this.value)
    this.codeEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.codeEditor.getValue()
    }
  }
}
</script>

<style scoped>
.code-editor{
  height: 100%;
  position: relative;
}
.code-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.code-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.code-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>