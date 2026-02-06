# TanStack Query v5 Advanced Challenge

API: https://jsonplaceholder.typicode.com/posts (100 записей, пагинация ?_page=N&_limit=N)

---

## Шаг 1-2: Setup [ ]
- Установить @tanstack/react-query и @tanstack/react-query-devtools
- Настроить провайдер с QueryClient и DevTools
- Подготовить типы и константы для работы с /posts

## Шаг 3: Infinite Scroll + серверный initialData [ ]
- Серверный компонент page.tsx делает первый fetch
- Клиентский компонент подхватывает данные как initialData в useInfiniteQuery
- Подгрузка следующих страниц при скролле (IntersectionObserver)

## Шаг 4: Optimistic Update для Infinite Query [ ]
- Мутация (PATCH) с мгновенным обновлением UI
- Rollback при ошибке
- Учесть двухуровневую структуру данных infinite query (pages -> items)

## Шаг 5: Abort запроса [ ]
- Кнопка отмены in-flight запроса
- Тест на Slow 3G

## Шаг 6: Управление кешем -- 4 кнопки [ ]
- cancelQueries, removeQueries, refetchQueries, invalidateQueries
- Понять разницу между ними на практике

## Шаг 7: staleTime и gcTime [ ]
- Настроить разные значения
- Наблюдать поведение в DevTools (fresh/stale/inactive/deleted)

## Шаг 8: select [ ]
- Трансформация данных query без изменения кеша
- Статистика + фильтрация по userId с UI
