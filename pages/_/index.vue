<script>
export default {
  middleware({ route, store, redirect }) {
    console.log('route', route.fullPath)
    if (route.fullPath === '/index.html') return redirect('/')
    return redirect('/404')
  },
}
</script>
