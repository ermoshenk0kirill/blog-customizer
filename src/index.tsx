import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articalState, setArticalState] = useState(defaultArticleState)
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articalState.fontFamilyOption.value,
					'--font-size': articalState.fontSizeOption.value,
					'--font-color': articalState.fontColor.value,
					'--container-width': articalState.contentWidth.value,
					'--bg-color': articalState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
				articalState={articalState}
				setArticalState={setArticalState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
