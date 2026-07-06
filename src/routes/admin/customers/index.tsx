import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ArrowUpDown, Mail, ShoppingBag, CircleCheck, CircleX } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getCustomers, type CustomerRow } from "@/lib/api/customers.functions";

export const Route = createFileRoute("/admin/customers/")({
  component: AdminCustomersPage,
});

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatPrice(price: number) {
  return `₱${price.toLocaleString("en-PH")}`;
}

type SortOption = "newest" | "name" | "orders_desc" | "orders_asc" | "spent_desc" | "spent_asc";

function AdminCustomersPage() {
  const { data, isLoading, error } = useQuery<CustomerRow[]>({
    queryKey: ["admin-customers"],
    queryFn: getCustomers,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!data) return [];
    let result = [...data];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.username.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q),
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.username.localeCompare(b.username);
        case "orders_desc":
          return b.order_count - a.order_count;
        case "orders_asc":
          return a.order_count - b.order_count;
        case "spent_desc":
          return b.total_spent - a.total_spent;
        case "spent_asc":
          return a.total_spent - b.total_spent;
        case "newest":
        default:
          return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }
    });

    return result;
  }, [data, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  if (safePage !== page) setPage(safePage);

  return (
    <div className="space-y-6">
      {/* ─── Page header ──────────────────────────────────────── */}
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">Customers</p>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">All customers</h1>
      </div>

      <div className="border-t border-gray-200" />

      {/* ─── Toolbar ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={sortBy}
            onValueChange={(v) => {
              setSortBy(v as SortOption);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-36">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="spent_desc">Spent ↓</SelectItem>
              <SelectItem value="spent_asc">Spent ↑</SelectItem>
              <SelectItem value="orders_desc">Orders ↓</SelectItem>
              <SelectItem value="orders_asc">Orders ↑</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ─── Loading state ────────────────────────────────────── */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-md animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <p className="text-sm text-red-600">{error instanceof Error ? error.message : "Could not load customers."}</p>
        </div>
      ) : (
        <>
          {/* ─── Table card ────────────────────────────────────── */}
          <div className="bg-white rounded-xl shadow-sm border">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No customers found</h3>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your search</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 border-b border-gray-200">
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Customer
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Status
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Orders
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Total spent
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Last order
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4">
                        Joined
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginated.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                {getInitials(customer.username)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm text-gray-900">{customer.username}</p>
                              <p className="text-xs text-gray-500">{customer.email}</p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          {customer.email_verified ? (
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 gap-1">
                              <CircleCheck className="h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 gap-1">
                              <CircleX className="h-3 w-3" />
                              Unverified
                            </Badge>
                          )}
                        </TableCell>

                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-sm text-gray-700">
                            <ShoppingBag className="h-3.5 w-3.5 text-gray-400" />
                            {customer.order_count}
                          </div>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm text-gray-700 tabular-nums">
                          {customer.total_spent > 0 ? formatPrice(customer.total_spent) : "—"}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm text-gray-700">
                          {customer.last_order_date
                            ? format(new Date(customer.last_order_date), "MMM d, yyyy")
                            : "—"}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-sm text-gray-500">
                          {customer.created_at
                            ? format(new Date(customer.created_at), "MMM d, yyyy")
                            : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>

                {/* ─── Table footer ──────────────────────────────── */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Showing {filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
                    {" "}to{" "}
                    {Math.min(safePage * pageSize, filtered.length)}
                    {" "}of {filtered.length} customers
                  </p>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(Math.max(1, safePage - 1));
                          }}
                          className={safePage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                          if (totalPages <= 7) return true;
                          if (p === 1 || p === totalPages) return true;
                          if (Math.abs(p - safePage) <= 1) return true;
                          return false;
                        })
                        .map((p, idx, arr) => {
                          const nodes = [];
                          if (idx > 0 && p - arr[idx - 1] > 1) {
                            nodes.push(
                              <PaginationItem key={`ellipsis-${p}`}>
                                <span className="flex h-9 w-9 items-center justify-center text-sm text-gray-400">...</span>
                              </PaginationItem>,
                            );
                          }
                          nodes.push(
                            <PaginationItem key={p}>
                              <PaginationLink
                                href="#"
                                isActive={p === safePage}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(p);
                                }}
                              >
                                {p}
                              </PaginationLink>
                            </PaginationItem>,
                          );
                          return nodes;
                        })
                        .flat()}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(Math.min(totalPages, safePage + 1));
                          }}
                          className={safePage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
