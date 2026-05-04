async function fetchLatestVideo() {
  const apiKey = 'AIzaSyDdjuTSlI2bHgvPIm__Af-hkkVoofSyInU';
  const channelId = 'UCfrZMAARlqEragXzTVCqZ4g';
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${channelId}&order=date&type=video&maxResults=1&key=${apiKey}`;
  const latestVideoElement = document.getElementById('latest-video');
  if (!latestVideoElement) return;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      latestVideoElement.innerHTML = '<p>Último vídeo não encontrado.</p>';
      return;
    }

    const videoId = data.items[0].id.videoId;
    if (!videoId) {
      latestVideoElement.innerHTML = '<p>Último vídeo não encontrado.</p>';
      return;
    }

    latestVideoElement.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="Última Pregação Castelo Forte" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  } catch (error) {
    console.error('Erro ao buscar último vídeo:', error);
    latestVideoElement.innerHTML = '<p>Erro ao carregar vídeo.</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchLatestVideo);