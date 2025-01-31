# 리액트 쿼리 시작하기

## 1. 쿼리 클라이언트 생성

- 쿼리 클라이언트(QueryClient)는 데이터를 관리하고 캐싱하는 역할을 한다.

## 2. QueryProvider 적용

- QueryProvider는 자식 컴포넌트들에게 쿼리 클라이언트와 캐시 설정을 제공하는 역할을 한다.

## 3. useQuery 호출

- `useQuery`는 서버에서 데이터를 가져오고, 그 데이터를 캐시하며 상태를 관리하는 훅이다. 이 훅은 데이터 fetching, 캐싱, 상태 업데이트를 처리하고, `staleTime`, `cacheTime`, `refetchInterval` 등의 옵션을 통해 쿼리의 동작을 제어할 수 있다. 또한, 기본적으로 실패한 요청은 3번까지 자동으로 재시도한다.

> ### useQueryClient
>
> - `useQueryClient`는 QueryClient 객체에 접근하여 쿼리 캐시를 직접 조작하거나, 쿼리를 수동으로 리페칭(refetch)하는 등의 작업을 할 수 있는 훅이다. 이를 통해 캐시된 데이터를 업데이트, 삭제하거나 쿼리의 상태를 관리할 수 있으며, `invalidateQueries`, `refetchQueries`, `setQueryData`, `getQueryData` 등의 메서드를 통해 쿼리 데이터를 제어한다.
>
> ### useQuery와 useQueryClient의 주요 차이점
>
> |       훅       | 목적                                          | 사용 예시                                      |
> | :------------: | --------------------------------------------- | ---------------------------------------------- |
> |    useQuery    | 데이터를 가져오고, 상태를 관리하는 데 사용    | 서버에서 데이터를 가져오고 로딩/에러 상태 관리 |
> | useQueryClient | 쿼리 캐시 및 상태를 수동으로 조작하는 데 사용 | 캐시된 데이터를 업데이트하거나, 쿼리를 무효화  |

> #### 참고
>
> - [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery)

# isFetching과 isLoading

## 1. isFetching

- `isFetching`은 **캐시된 데이터와 관계없이** 비동기 쿼리 함수가 실행 중(로딩 중이거나 새로운 데이터를 요청 중)일 때 `true`가 된다. 이는 데이터를 새로 가져오는 중이거나 기존 데이터를 다시 가져오는 중임을 나타낸다.

> ## 쿼리란?

- 쿼리는 서버로부터 데이터를 요청하는 작업을 의미한다. `useQuery` 훅을 사용하여 API로 데이터를 요청하고, 이때 요청하는 작업을 쿼리라고 부른다.

## 2. isLoading

- `isLoading`은 `isFetching`의 하위 집합으로, 캐시된 데이터가 없고 첫 번째 데이터 요청을 통해 데이터를 가져오는 상태일 때 `true`가 된다. 즉, `isLoading`은 처음 데이터를 로딩할 때만 `true`가 되고, 데이터가 이미 캐시되어 있으면 두 번째 이후 요청에서는 `false`가 된다. `isLoading`일 때는 항상 `isFetching`도 `true`다.

> #### 참고
>
> - [Query Retries](https://tanstack.com/query/latest/docs/framework/react/guides/query-retries)

# staleTime과 gcTime

## 1. staleTime

- `staleTime`은 데이터를 다시 가져와야 할 시점을 결정한다. 기본값은 0ms로 설정되어 있으며, 이는 데이터를 가져온 직후 바로 stale로 간주되어 즉시 서버에서 다시 데이터를 가져오려고 시도한다.

> ### Stale Data란?

- 데이터가 오래됐다는 것은 유효기간이 만료되어 새로 데이터를 가져올 준비가 되었다는 뜻이다. 이때 데이터는 여전히 캐시에 남아 있지만 stale 상태로 표시되며 다시 검증이 필요하게 된다. 데이터의 prefetch는 stale 상태일 때만 트리거되는데 예를 들어 컴포넌트가 다시 마운트되거나 브라우저 창이 리포커싱될 때 발생한다. `staleTime`은 데이터의 최대 수명으로, 서버에서 최신 데이터를 가져오기 전에 데이터를 캐시에서 얼마나 오랫동안 사용할지를 결정한다.

## 2. gcTime

- `gcTime`은 캐시된 데이터를 얼마나 오랫동안 유지할지 결정한다. 데이터와 관련된 활성 `useQuery`가 없고, 현재 페이지에서 데이터가 표시되지 않으면 "cold storage" 상태로 전환된다. 이때 데이터는 사용되지 않지만 캐시에 남아 있으며, `gcTime`이 지나면 캐시에서 삭제된다.

- 기본값은 5분으로, 데이터가 페이지에 표시된 후부터 시간이 측정된다. 즉, 데이터가 페이지에 표시될 때는 `gcTime`이 진행되지 않으며, 데이터가 더 이상 사용되지 않으면 시간이 진행된다.

- gcTime이 지나면 데이터는 garbage collection 처리되어 Tanstack Query에서 더 이상 사용할 수 없다.

## 3. 케이스 비교

### 1. 데이터가 fresh이고, staleTime도 남아 있으며, 캐시에도 있고, gcTime도 지나지 않은 경우 (Fresh and in cache)

- 캐시된 데이터를 그대로 사용하며, refetch는 트리거되지 않는다. 왜냐하면 데이터가 fresh 상태이므로 추가적인 요청 없이 캐시된 데이터를 사용할 수 있기 때문이다.

### 2. 데이터가 stale이고 캐시에 있는 경우 (Stale and in cache)

- refetch 트리거가 발생하면 서버에서 최신 데이터를 가져오기 전에(데이터를 가져오는 동안) 캐시된 데이터를 표시한다.

### 3. 데이터가 캐시에 없고, gcTime이 지나 데이터가 삭제된 경우 (Not in cache)

- 데이터가 삭제되어 캐시에 없으면, 새로 가져오는 동안 표시할 데이터가 없다. 서버에서 데이터를 가져올 때까지 쿼리는 빈 데이터를 반환하며, 데이터가 준비되면 다시 표시된다.

- 데이터가 캐시에 있을 경우, `useQuery`는 조건에 맞는 캐시된 데이터를 반환하고, 필요한 경우 refetch가 발생한다. 하지만 캐시에 데이터가 없으면 서버에서 데이터를 가져올 때까지 표시할 데이터가 없다는 점을 유의해야 한다.

> ### 트리거 조건
>
> - 트리거 조건이 발생하면 클라이언트의 데이터가 서버의 데이터와 일치하지 않음을 감지하게 된다.
>
>   - 컴포넌트가 다시 마운트 될 때
>   - 창에 다시 포커싱 될 때
>   - `userQuery`에서 반환된 refetch 함수를 수동으로 실행할 때
>   - 지정된 간격에서 자동 refetch가 발생할 때
>   - mutation 후 쿼리를 무효화할 때

# Query Key

- `queryKey`는 데이터를 고유하게 식별하는 역할을 할 뿐만 아니라, 종속성 배열로서도 기능한다. `queryKey`에 배열의 두 번째 요소를 추가하면, 이 값이 변경될 때마다 새로운 쿼리가 생성된다. 이로 인해 각 쿼리는 개별적인 staleTime과 cacheTime을 가지며, 두 번째 요소가 달라지면 완전히 다른 쿼리로 간주된다.

- 따라서 데이터를 가져오는 쿼리 함수에서 사용하는 모든 값은 `queryKey`의 일부로 포함되어야 하며, 이를 통해 해당 값에 대한 종속성도 함께 관리된다. `queryKey`에 변수를 추가하면, 해당 변수를 기준으로 쿼리가 독립적으로 캐시되고, 변수 값이 변경될 때마다 쿼리가 자동으로 다시 실행되어 최신 데이터를 가져온다.

# Prefetching

- Prefetching은 데이터를 캐시에 미리 추가하는 과정이다. 이때, 데이터를 캐시에 추가할 수는 있지만 기본적으로 그 데이터는 stale 상태로 간주된다. 이후 데이터를 사용할 때, 데이터가 여전히 stale 상태이기 때문에 다시 서버에서 데이터를 가져와야 한다. 그러나 데이터를 다시 가져오는 동안, Tanstack Query는 캐시된 데이터를 제공하여 사용자 경험을 유지한다. 또한, 캐시가 만료되지 않았다면 새로고침이 일어날 때까지 캐시된 데이터를 표시할 수 있다.

- 예를 들어, 사용자가 특정 포스트 페이지에서 캐시된 데이터를 오랫동안 보고 있을 경우, 이후 다른 페이지를 클릭했을 때 캐시가 만료되어 데이터가 없을 수 있다. 이 경우, 사용자 화면에는 로딩 상태가 표시된다.

> #### 참고
>
> - [Prefetching & Router Integration](https://tanstack.com/query/latest/docs/framework/react/guides/prefetching#prefetchquery--prefetchinfinitequery)

# Mutation

- Mutation은 서버에 네트워크 요청을 보내 실제 데이터를 업데이트하는 작업을 의미한다. 예를 들어, 블로그 포스트를 추가하거나 삭제하거나, 포스트 제목을 변경하는 등의 경우가 이에 해당한다.

- `useMutation`은 `useQuery`와 매우 유사하지만 몇 가지 차이점이 있다. `useMutation`은 `mutate` 함수를 반환하는데, 이 함수는 서버에 변경 사항을 적용할 때 사용된다. `useMutation`은 캐시가 없기 때문에 쿼리 키가 필요하지 않으며, `isLoading`과 `isFetching`으로 구분되어 있는 `useQuery`와는 달리 `isPending`만 존재한다. 또한, `useMutation`은 기본적으로 재시도를 하지 않지만, 원하면 자동 재시도를 설정할 수 있다.

> #### 참고
>
> - [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
