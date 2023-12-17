import { useEffect, useState } from 'react';
import styles from './../../../styles/dashboard.module.css';
import Cookies from 'js-cookie';
import router from 'next/router';
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';


import useStyles from './style';
import { axios } from 'src/lib/axios';

function convertToBST(utcDateString : string) {
  const utcDate = new Date(utcDateString);
  
  // Convert to Bangladesh Standard Time (BST)
  const bstDate = new Date(utcDate.getTime());// + (6 * 60 * 60 * 1000)); // Add 6 hours for BST
  
  const year = bstDate.getFullYear();
  const month = String(bstDate.getMonth() + 1).padStart(2, '0');
  const day = String(bstDate.getDate()).padStart(2, '0');
  const hours24 = bstDate.getHours();
  const hours12 = hours24 % 12 || 12; // Convert to 12-hour format
  const minutes = String(bstDate.getMinutes()).padStart(2, '0');
  const seconds = String(bstDate.getSeconds()).padStart(2, '0');
  const ampm = hours24 < 12 ? 'AM' : 'PM';
  
  return `${year}-${month}-${day} ${hours12}:${minutes}:${seconds} ${ampm}`;
}

interface SupplyOrder {
  id: number;
  user_email: string;
  time: string;
  status: number;
  cnt_p1: number;
  cnt_p2: number;
  cnt_p3: number;
  total: number;
}

interface SupplyOrderTableProps {
  supplyOrders: SupplyOrder[];
}

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?(): void;
}


interface ProductData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <th className={classes.th}>
      {onSort ? (
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="apart">
            <Text fw={500} fz="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size="0.9rem" stroke={1.5} />
            </Center>
          </Group>
        </UnstyledButton>
      ) : (
        <Text fw={500} fz="sm">
          {children}
        </Text>
      )}
    </th>
  );
}

function filterData(data: SupplyOrder[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(item).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: SupplyOrder[],
  payload: { sortBy: keyof SupplyOrder | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

export default function SupplyPage() {
  const [supplyOrders, setSupplyOrders] = useState<SupplyOrder[]>([]);
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState<SupplyOrder[]>([]);
  const [sortBy, setSortBy] = useState<keyof SupplyOrder | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [lineChartData, setLineChartData] = useState<ProductData | null>(null);
  
  useEffect(() => {
    //const isLoggedIn = Cookies.get('acc_no');
    const isLoggedIn = Cookies.get('email_supplier');
    if (!isLoggedIn) {
      router.push('./login');
    }
  }, []);

  const setSorting = (field: keyof SupplyOrder) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(supplyOrders, {
        sortBy: field,
        reversed,
        search,
      })
    );
  };

  const getStatus = (x: number): string => {
    if (x === 1) {
        return "Pending Ordered";
    } else if (x === 2) {
        return "Cancelled";
    } else if (x === 3) {
        return "Delivered";
    } else {
        return "Unknown Status";
    }
};

  const rows = sortedData.map((order) => (
    <tr key={order.id}>
      <td>{convertToBST(order.time)}</td>
      <td>{getStatus(order.status)}</td>
      <td>{order.cnt_p1}</td>
      <td>{order.cnt_p2}</td>
      <td>{order.cnt_p3}</td>
      <td>{order.total}</td>
    </tr>
  ));

  useEffect(() => {
    const isLoggedIn = Cookies.get('email');
    if (!isLoggedIn) {
      router.push('./login');
    }
  }, []);

  useEffect(() => {
    
      axios.get('/get-user-orders', { params: { email: Cookies.get('email') } })
      .then((response) => {
        setSupplyOrders(response.data.orders);
        setSortedData(
          sortData(response.data.orders, {
            sortBy,
            reversed: reverseSortDirection,
            search,
          })
        );
      })
      .catch((error) => console.error('Error fetching supply orders:', error));
  }, []);

  useEffect(() => {
    setSortedData(sortData(supplyOrders, { sortBy, reversed: reverseSortDirection, search }));
  }, [supplyOrders, sortBy, reverseSortDirection, search]);

  

  
  return (
    <div className={styles.container} style={{ marginTop: '-8%' }}>

      <main className={styles.main}>
        <h2>Past Orders</h2>
        {supplyOrders.length === 0 ? (
          <div className={styles.warnCard}>No orders available.</div>
        ) : (
          <ScrollArea>
            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              miw={700}
              sx={{ tableLayout: 'fixed' }}
              striped
              highlightOnHover
              withBorder
            >
              <thead>
                <tr>
                  <Th sorted={sortBy === 'time'} reversed={reverseSortDirection} onSort={() => setSorting('time')}>
                    Time
                  </Th>
                  <Th
                  >
                    Status
                  </Th>
                  <Th
                    sorted={sortBy === 'cnt_p1'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('cnt_p1')}
                  >
                    Pixel 6a
                  </Th>
                  <Th
                    sorted={sortBy === 'cnt_p2'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('cnt_p2')}
                  >
                    Pixel 6 pro
                  </Th>
                  <Th
                    sorted={sortBy === 'cnt_p3'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('cnt_p3')}
                  >
                    Pixel 6
                  </Th>
                  <Th
                    sorted={sortBy === 'total'}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting('total')}
                  >
                    Price
                  </Th>
                </tr>
              </thead>
              <tbody>
                {rows.length > 0 ? (
                  rows
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <Text weight={500} align="center">
                        Nothing found
                      </Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </ScrollArea>
        )}
      </main>
    </div>
  );
}
