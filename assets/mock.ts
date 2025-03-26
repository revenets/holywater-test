const books_mock = {
	books: [
		{
			id: 0,
			name: "The Sandman",
			author: "Neil Gaiman",
			summary:
				"Neil Gaiman's The Sandman was launched in 1989. This extremely popular series was bound into ten collections. Following Dream of the Endless, also known as Morpheus, Onieros and many other names, we explore a magical world filled with stories both horrific and beautiful.",
			genre: "Fantasy",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/the_sandman.jpg?alt=media&token=db0c3806-da65-4d96-ba4c-f6cf27a92cd3",
			views: "400K",
			likes: "30K",
			quotes: "20K",
		},
		{
			id: 1,
			name: "American Gods",
			author: "Neil Gaiman",
			summary:
				"Locked behind bars for three years, Shadow did his time, quietly waiting for the day when he could return to Eagle Point, Indiana. A man no longer scared of what tomorrow might bring, all he wanted was to be with Laura, the wife he deeply loved, and start a new life.But just days before his release, Laura and Shadow's best friend are killed in an accident. With his life in pieces and nothing to keep him tethered, Shadow accepts a job from a beguiling stranger he meets on the way home, an enigmatic man who calls himself Mr. Wednesday. A trickster and a rogue, Wednesday seems to know more about Shadow than Shadow does himself.",
			genre: "Fantasy",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/american_gods.jpg?alt=media&token=faabd9a5-8f3a-4253-b6c6-8da845d28b25",
			views: "310К",
			likes: "52K",
			quotes: "10K",
		},
		{
			id: 2,
			name: "Dune",
			author: "Frank Herbert",
			summary:
				"Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Maud'dib. He would avenge the traitorous plot against his noble family - and would bring to fruition humankind's most ancient and unattainable dream.",
			genre: "Fantasy",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/dune.jpg?alt=media&token=54dc04b9-665b-41de-9cf2-b3062f649296",
			views: "210К",
			likes: "20K",
			quotes: "50K",
		},
		{
			id: 3,
			name: "Ready Player One",
			author: "Ernest Cline",
			summary:
				"At once wildly original and stuffed with irresistible nostalgia, Ready Player One is a spectacularly genre-busting, ambitious, and charming debut - part quest novel, part love story, and part virtual space opera set in a universe where spell-slinging mages battle giant Japanese robots, entire planets are inspired by Blade Runner, and flying DeLoreans achieve light speed.",
			genre: "Science",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/ready_player_one.jpg?alt=media&token=3c28d6d1-a949-4989-ae07-0218c44acdd6",
			views: "610К",
			likes: "40K",
			quotes: "20K",
		},
		{
			id: 4,
			name: "Armada: A Novel",
			author: "Ernest Cline",
			summary:
				"he new novel from the best-selling author of Ready Player One. It's just another day of high school for Zack Lightman. He's daydreaming through another boring math class, with just one more month to go until graduation and freedom - if he can make it that long without getting suspended again. Then he glances out his classroom window and spots the flying saucer.",
			genre: "Science",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/armada.jpg?alt=media&token=6f8bf742-f306-4fdb-bdf7-b57b9d0664ed",
			views: "150К",
			likes: "10K",
			quotes: "80K",
		},
		{
			id: 5,
			name: "The Hitchhiker's Guide to the Galaxy",
			author: "Douglas Adams",
			summary:
				"Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy who, for the last 15 years, has been posing as an out-of-work actor.",
			genre: "Science",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/the_hitchhikers_guide.jpg?alt=media&token=6a8635ea-2e7e-428b-815d-5fb77fbe978f",
			views: "400К",
			likes: "100K",
			quotes: "50K",
		},
		{
			id: 6,
			name: "Divergent",
			author: "Veronica Roth",
			summary:
				"In Beatrice Prior's dystopian Chicago, society is divided into five factions, each dedicated to the cultivation of a particular virtue - Candor (the honest), Abnegation (the selfless), Dauntless (the brave), Amity (the peaceful), and Erudite (the intelligent). On an appointed day of every year, all sixteen-year-olds must select the faction to which they will devote the rest of their lives. For Beatrice, the decision is between staying with her family and being who she really is - she can't have both. So she makes a choice that surprises everyone, including herself.",
			genre: "Romance",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/divergent.jpg?alt=media&token=29f5e20a-107a-4025-9733-1f3112114551",
			views: "600К",
			likes: "50K",
			quotes: "10K",
		},
		{
			id: 7,
			name: "Project Hail Mary",
			author: "Andy Weir",
			summary:
				"Ryland Grace is the sole survivor on a desperate, last-chance mission - and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it. All he knows is that he's been asleep for a very, very long time. And he's just been awakened to find himself millions of miles from home, with nothing but two corpses for company.",
			genre: "Romance",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/project_hail_mary.jpg?alt=media&token=e7e04f6d-32ad-4d17-868a-30436986ed81",
			views: "210К",
			likes: "20K",
			quotes: "50K",
		},
		{
			id: 8,
			name: "Leviathan Wakes",
			author: "James S. A. Corey",
			summary:
				"The first book in the landmark Expanse series. Leviathan Wakes is James S. A. Corey's first novel in the epic New York Times best-selling series The Expanse, a modern masterwork of science fiction in which humanity has colonized the solar system. Two hundred years after migrating into space, mankind is in turmoil. When a reluctant ship's captain and washed-up detective find themselves involved in the case of a missing girl, what they discover brings our solar system to the brink of civil war and exposes the greatest conspiracy in human history. ",
			genre: "Romance",
			cover_url:
				"https://firebasestorage.googleapis.com/v0/b/bookapp-b1f1b.appspot.com/o/leviathan_wakes.jpg?alt=media&token=cec55caf-0eb2-4c14-8d69-fce35b49a164",
			views: "150К",
			likes: "30K",
			quotes: "50K",
		},
	],
	top_banner_slides: [
		{
			id: 0,
			book_id: 2,
			cover: "https://unsplash.it/600/300",
		},
		{
			id: 1,
			book_id: 3,
			cover: "https://unsplash.it/600/400",
		},
		{
			id: 2,
			book_id: 5,
			cover: "https://unsplash.it/600/500",
		},
	],
	you_will_like_section: [4, 6, 8],
};

export { books_mock };
