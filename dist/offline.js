addEventListener('fetch', function (event) {
	const request = event.request;

	// https://stackoverflow.com/a/49719964
	if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
		return;
	}

	event.respondWith(
		caches.match(request).then((localContent) => {
			return localContent || fetch(request).then(remoteContent => {
				const copy = remoteContent.clone();

				event.waitUntil(() => {
					caches.open('offline').then((cache) => {
						return cache.put(request, copy);
					});
				});

				return remoteContent;
			})
		})
	);
});
