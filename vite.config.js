import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
	plugins: [
	react(),
	VitePWA({
	  registerType:'autoUpdate',
	  manifest: {
		name: 'Bandi Festa',
		short_name: 'Bandi',
		description: 'Bandi Festival Application',
		theme_color: '#ffffff',
		background_color: '#ffffff',
	  }
	}),
	viteImagemin({
	  // JPG 압축 설정
	  mozjpeg: {
		quality: 75, // 화질을 75% 수준으로 압축 (용량 대비 효율 최적)
	  },
	  // PNG 압축 설정
	  optipng: {
		optimizationLevel: 7, // 압축 레벨 0~7
	  },
	  // PNG 유손실 압축
	  pngquant: {
		quality: [0.7, 0.8],
		speed: 4,
	  },
	}),],
	base: "/bandiFesta/",
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
		output: {
			manualChunks: {
			// 핵심 라이브러리를 하나의 덩어리로 묶어 참조 오류 방지
			'vendor-core': ['react', 'react-dom', 'react-router-dom'],
			'vendor-utils': ['axios'],
			// 무거운 외부 라이브러리만 별도 분리
			'vendor-three': ['three'],
			'vendor-swiper': ['swiper'],
			},
		},
		},
	}
})
