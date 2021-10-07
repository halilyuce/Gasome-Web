<script>
export default {
  middleware({ route, redirect }) {
    console.log('route', route.fullPath)
    if (route.fullPath === '/index.html') return redirect('/')
    return redirect('/404')
  },
}
</script>
