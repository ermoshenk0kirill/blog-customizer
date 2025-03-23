import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, FormEvent } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { clsx } from 'clsx';

import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type TArticleParamsForm = {
	articalState: ArticleStateType;
	setArticalState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articalState,
	setArticalState,
}: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false); // сайдбар "закрыт" или "открыт"
	const [selectArticelState, setSelectArticalState] = useState(articalState); // состояние значений формы
	const sidebarRef = useRef<HTMLDivElement>(null); // ref чтобы закрыть при клике
	useOutsideClickClose({
		isOpen: isOpen,
		onChange: setIsOpen,
		rootRef: sidebarRef,
	}); // функция закрытия при клике вне сайдбара

	// обработчик изменения состояния формы
	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticalState((prevState) => ({
			...prevState, // сохраняем предыдущее состояние
			[key]: value, // обновляем значение ключа
		}));
	};

	// обработчик сабмита формы
	const submitFormHandler = (e: FormEvent) => {
		e.preventDefault();

		setArticalState(selectArticelState);
	};

	// обработчик сброса формы
	const resetFormHandler = () => {
		setArticalState(defaultArticleState);
		setSelectArticalState(defaultArticleState);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={submitFormHandler}
					onReset={resetFormHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						задайте параметры шрифта
					</Text>

					<Select
						title='шрифты'
						selected={selectArticelState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							inputChangeHandler('fontFamilyOption', value);
						}}
					/>

					<RadioGroup
						title='размер шрифта'
						name='radio'
						options={fontSizeOptions}
						selected={selectArticelState.fontSizeOption}
						onChange={(value) => {
							inputChangeHandler('fontSizeOption', value);
						}}
					/>

					<Select
						title='цвет шрифта'
						selected={selectArticelState.fontColor}
						options={fontColors}
						onChange={(value) => {
							inputChangeHandler('fontColor', value);
						}}
					/>

					<Separator />

					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={selectArticelState.backgroundColor}
						onChange={(value) => {
							inputChangeHandler('backgroundColor', value);
						}}
					/>

					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={selectArticelState.contentWidth}
						onChange={(value) => {
							inputChangeHandler('contentWidth', value);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetFormHandler}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
