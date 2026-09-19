# Pasta de Vídeos / Video Embeds

O vídeo principal da página é um VSL integrado via script do player Pro-Vid-Cast / Panda / Lovable:
ID do Vídeo: 67438c53-c438-4278-bd53-688a21fcf691
URL do Player: https://pro-vid-cast.lovable.app/embed.js

Caso queira utilizar um arquivo de vídeo local MP4 em vez do player em nuvem:
1. Coloque o arquivo de vídeo nesta pasta (ex: videos/vsl.mp4)
2. No index.html, você pode substituir o elemento `#pvc-player-67438c53-c438-4278-bd53-688a21fcf691` por:
   <video controls class="w-full rounded-2xl shadow-2xl" poster="images/feature-1.jpg">
     <source src="videos/vsl.mp4" type="video/mp4">
   </video>
