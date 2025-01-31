# useQuery와 useInfiniteQuery의 차이점

## 1. 반환되는 객체의 데이터 구조와 형태

- `useQuery`를 사용하면 쿼리 함수에서 반환되는 데이터는 `data` 속성에 담겨 반환된다. 반면, `useInfiniteQuery`는 반환되는 객체가 `data`와 `pages`라는 두 가지 속성을 포함한다. `pages`는 각 데이터 페이지를 나타내는 객체의 배열이며, 배열의 각 요소는 `useQuery`를 사용할 때마다 각각의 쿼리에서 받을 수 있는 데이터를 포함한다. 또한, `pageParams`는 각 페이지마다 사용하는 파라미터를 기록한다.

- 각 쿼리는 `pages` 배열 내에서 자신만의 요소를 가지고 있으며, 이는 해당 쿼리의 데이터를 나타낸다.

- 쿼리는 페이지가 진행될수록 변경되며, `pageParams`는 각 페이지에서 검색된 쿼리의 키를 추적한다.

# useInfiniteQuery 문법

- `pageParam`은 쿼리 함수(`queryFn`)에 전달되는 매개변수다.

- `useInfiniteQuery`를 사용할 때, 쿼리 함수는 객체에서 구조 분해된 `pageParam`을 받으며, 이를 기본 URL로 설정된 값으로 초기화한다.
  이 함수는 기본 URL로 설정된 페이지 매개변수를 사용하여, 해당 `pageParam`을 기반으로 정의된 fetch URL을 실행한다. `fetchUrl`은 해당 페이지를 로딩하고, `pageParam`을 사용하여 적절한 페이지를 요청한 뒤 결과를 반환한다.

  pageParam은 useInfiniteQuery에서 데이터를 가져오는 데 필요한 페이지 정보를 담고 있는 매개변수다. 이 매개변수는 **쿼리 함수(queryFn)**에 전달되어 데이터를 요청하는 URL을 동적으로 생성하는 데 사용된다. 예를 들어, 페이지 번호, URL, 또는 페이지네이션에 필요한 다른 정보가 될 수 있다.

pageParam은 첫 번째 요청 이후 자동으로 업데이트되어 다음 페이지 데이터를 가져올 때 사용된다. useInfiniteQuery는 이전 페이지의 데이터를 기반으로 다음 페이지를 요청하기 위해 pageParam을 활용한다.

```javascript
useInfiniteQuery({
  queryKey: ['sw-people'],
  queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
});
```

- `pageParam`의 현재 값은 실제로 Tanstack Query에 의해 관리된다. 이는 컴포넌트 상태의 일부가 아니며, 이를 관리하는 방법은 `useInfiniteQuery` 옵션을 사용하는 것이다. 예를 들어, `getNextPageParam` 옵션은 마지막 페이지 데이터나 모든 페이지의 데이터를 기반으로 다음 페이지를 가져오는 방법을 정의하는 함수다. 이 옵션은 `pageParam`을 업데이트한다.

# useInfiniteQuery 반환 객체의 속성

## 1. getNextPageParam

- `getNextPageParam`은 다음 페이지를 요청할 때 필요한 파라미터를 반환하는 함수다. 이 함수는 API 응답에서 제공되는 정보(예: next 같은)를 기반으로, 더 이상 페이지가 없으면 `undefined` 또는 `null`을 반환한다. `getNextPageParam`은 `lastPage`(마지막으로 로드된 페이지의 데이터)와 `allPages`(지금까지 로드된 모든 페이지의 데이터 배열)를 인자로 받아 다음 페이지 파라미터를 계산한다.

- 예를 들어, 첫 번째 페이지의 응답 데이터에는 `next`와 같은 필드가 있을 수 있다. `getNextPageParam`은 이 `next` 값을 추출하여 **다음 페이지를 요청하는 데 필요한 pageParam**을 반환한다.

## 2. hasNextPage

- `hasNextPage`는 다음 페이지가 있는지(더 불러올 데이터가 있는지) 확인하는 속성이다. 이 값은 `getNextPageParam` 함수의 반환 값에 기반하며, `useInfiniteQuery`에서 마지막 쿼리 데이터를 사용하여 다음 쿼리가 무엇이 될지 알려준다.

- `hasNextPage`가 `undefined`라면 더 이상 데이터가 없다는 것을 의미하며, `useInfiniteQuery`에서 반환된 객체의 `hasNextPage` 속성은 `false`가 된다.

## 3. isFetchingNextPage

- `isFetchingNextPage`는 `useQuery`에는 없는 속성으로, `useInfiniteQuery`에서만 제공된다. 이를 통해 사용자가 다음 페이지를 가져오는 중인지, 아니면 일반적으로 데이터를 가져오는 중인지 구별할 수 있다.

# 흐름

## 1. 컴포넌트 마운트

- 이 시점에서는 `useInfiniteQuery`에서 반환된 객체의 데이터 속성이 아직 쿼리를 수행하지 않았기 때문에 `undefined`다.

## 2. 첫 번째 페이지 가져오기

- 그 후 `useInfiniteQuery`는 쿼리 함수에 `pageParam`을 인수로 전달하고, 이를 사용하여 첫 번째 페이지를 가져온다. 만약 기본값을 정의한 경우, 첫 번째 pageParam은 정의된 기본값을 사용한다. `pageParam`을 통해 첫 번째 페이지를 가져오고, 그 후 데이터 반환 객체의 `pages` 속성을 설정한다. 특히 배열의 첫 번째 요소는 인덱스 0에 해당하며, 이는 쿼리 함수가 반환하는 데이터가 된다.

## 3. getNextPageParam을 사용하여 pageParam 업데이트

- 데이터를 받은 후, Tanstack Query는 `getNextPageParam`을 실행한다. 이 함수는 `useInfiniteQuery`에 옵션으로 전달되며, 마지막 페이지와 모든 페이지 데이터를 받아 `pageParam`을 업데이트한다. 예를 들어, 첫 번째 데이터를 가져온 후 `getNextPageParam`을 사용하여 두 번째 페이지를 위한 `pageParam`을 업데이트한다고 할 경우, 이 시점에서 다음 페이지가 존재하는지 여부는 `pageParam`이 `undefined`인지 아닌지에 따라 결정된다.

## 4-1. hasNextPage가 True일 경우 (사용자가 스크롤하거나 다음 페이지 버튼 클릭)

- 이제 `fetchNextPage` 함수는 `useInfiniteQuery`에서 반환된 객체의 속성이다. 사용자가 더 많은 데이터가 필요할 때, Tanstack Query는 `pageParam`에 관계없이 두 번째 페이지를 요청하고, 쿼리 함수를 실행한다. 그 후 페이지 배열에 다음 요소를 추가한다. 새로운 데이터를 받은 후, `getNextPageParam`을 실행하여 다음 페이지 매개변수를 설정한다. 만약 `getNextPageParam`이 `undefined`를 반환하면, 더 이상 페이지가 없는 것이다.

### 4-2. hasNextPage가 false일 경우 (다음 페이지가 없는 경우)

- `hasNextPage`는 `pageParam`이 `undefined`이기 때문에 `false`로 설정된다.

> #### 참고
>
> - [Infinite Queries](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries)
> - [useInfiniteQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery)
