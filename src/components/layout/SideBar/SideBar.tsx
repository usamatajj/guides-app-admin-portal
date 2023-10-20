import React, { useMemo, useState } from 'react'
import {
  AlertOutlined,
  BookOutlined,
  UserOutlined,
  SnippetsOutlined,
} from '@ant-design/icons'
import { Button, MenuProps } from 'antd'
import { Aside, Menu, Text } from './SideBar.style'
import { useLocation, useNavigate } from 'react-router'
import { getParent } from 'utils/helpers'

export type MenuItems = {
  label: string
  icon?: JSX.Element
  path: string
  baseUrl?: any
  children?: MenuItems[]
}

export const menuItems: MenuItems[] = [
  {
    label: 'Books',
    icon: <BookOutlined />,
    path: '/dashboard/books',
  },
  {
    label: 'Users',
    icon: <UserOutlined />,
    path: '/dashboard/users',
  },
  {
    label: 'Board',
    icon: <AlertOutlined />,
    path: '/dashboard/boards',
  },
  {
    label: 'Classes',
    icon: <SnippetsOutlined />,
    path: '/dashboard/classes',
  },
]

const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleIframe = (baseUrl: string, path: string) => {
    navigate(path)
  }

  const items: MenuProps['items'] = useMemo(() => {
    const menuItemsListed = menuItems.map(
      ({ icon, label, children, baseUrl, path }) => {
        return {
          key: path,
          icon,
          label: children ? (
            label
          ) : (
            <Button type="text" onClick={() => handleIframe(baseUrl, path)}>
              {label}
            </Button>
          ),
          children:
            children &&
            children.map(({ label, path, baseUrl, children: subChildren }) => {
              return {
                key: path,
                label: subChildren ? (
                  label
                ) : (
                  <Button
                    type="text"
                    onClick={() => handleIframe(baseUrl, path)}
                  >
                    {label}
                  </Button>
                ),
                children:
                  subChildren &&
                  subChildren.map(({ label, path, baseUrl }) => {
                    return {
                      key: path,
                      label: (
                        <Button
                          type="text"
                          onClick={() => handleIframe(baseUrl, path)}
                        >
                          {label}
                        </Button>
                      ),
                    }
                  }),
              }
            }),
        }
      },
    )
    return menuItemsListed
  }, [menuItems])

  return (
    <Aside
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={270}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={[...getParent(location.pathname, menuItems).parent]}
        defaultSelectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
      />
      <Text className="rights">All Rights Reserved. Saas Framework 2022</Text>
    </Aside>
  )
}

export default SideBar
