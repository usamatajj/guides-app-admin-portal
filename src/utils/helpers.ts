import { menuItems, MenuItems } from 'components/layout/SideBar'

import { API_URL } from './const'

export const setSubKey = (path: string) => {
  if (path === '/object-types' || path === '/object-instances')
    return ['Access Control']
  else if (path === '/index-policies' || path == '/indices')
    return ['OpenSearch (ISM)']
  else if (path === '/config-management' || path == '/upgrades')
    return ['Configurations']
  else if (path === '/') return ['Configurations']
  else return ['']
}

export const getParent = (key: string, items: MenuItems[]) => {
  let foundedKey = ''
  let parent = ''
  let parent_parent = ''
  const all_paths: string[] = []
  items?.forEach((item: any) => {
    all_paths.push(item.path)
    if (item.path === key) {
      foundedKey === item.path
    } else {
      if (item.children) {
        item.children.forEach((subitem: any) => {
          all_paths.push(subitem.path)
          if (subitem.path === key) {
            parent_parent = ''
            parent = item.path
            foundedKey = subitem.path
          } else {
            if (subitem.children) {
              subitem.children.forEach((subitem_item: any) => {
                all_paths.push(subitem_item.path)
                if (subitem_item.path === key) {
                  parent_parent = item.path
                  parent = subitem.path
                  foundedKey = subitem_item.path
                }
              })
            }
          }
        })
      }
    }
  })
  const paths = all_paths.filter((path, i) => all_paths.indexOf(path) === i)
  return { parent: [foundedKey, parent, parent_parent], paths }
}

export const setInitialUrl = (path: string) => {
  return (
    API_URL +
    (path === '/' ||
    !getParent(window.location.pathname, menuItems).paths.includes(path)
      ? '/config-management'
      : path.split('/app')[1])
  )
}

export const generateRegex = (input: string) => {
  let string = '^'

  const arr = input.trim().split(' ')
  arr.forEach(function (chars, i) {
    string += chars + '\\w*' + (arr.length - 1 > i ? '\\s+' : '')
  })

  return new RegExp(string, 'i')
}

export const checkElementInView = (
  data: any[],
  count: number,
  setPageSize: (number: number) => void,
  pageSize: number,
  refetch: () => void,
) => {
  return new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (count > 12 && count > data?.length) {
          setPageSize(pageSize + 12)
          setTimeout(() => {
            refetch()
          }, 100)
        }
        return
      } else return
    },
    {
      root: null,
      threshold: 0.7,
    },
  )
}
