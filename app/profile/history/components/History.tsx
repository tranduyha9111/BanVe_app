import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import next from "next";
import Link from "next/link";

import {
  User,
  ShoppingBag,
  History as HistoryIcon,
  Search,
  Download,
  PencilLine,
  CreditCard,
  Image,
  File,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function History() {
  return (
    <>
      {/* HEADER */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Tài khoản của tôi
          </h1>
          <p className="text-white/80 text-sm lg:text-base">
            Quản lý thông tin cá nhân và hoạt động của bạn
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl py-6 sticky top-20 border border-gray-200 shadow-sm">
              <CardContent className="p-0">
                <div className="text-center p-6 border-b border-gray-100">
                  <Avatar className="relative flex size-8 shrink-0 overflow-hidden rounded-full w-20 h-20 mx-auto mb-4 ring-4 ring-gray-100">
                    <AvatarFallback className="flex size-full items-center justify-center rounded-full text-lg font-semibold bg-gray-900 text-white">
                      TDH
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-base text-gray-900 mb-1">
                    TDH
                  </h3>
                  <p className="text-xs text-gray-500 truncate px-2">
                    tranduy.ha911@gmail.com
                  </p>
                </div>
                <nav className="p-3 space-y-1">
                  <Link
                    href="/profile/personal"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <User className="size-5" />
                    <span className="text-sm font-medium">
                      Thông tin cá nhân
                    </span>
                  </Link>

                  <Link
                    href="/profile/collaborator"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <User className="size-5" />
                    <span className="text-sm font-medium">Cộng tác viên</span>
                  </Link>

                  <Link
                    href="/profile/order"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-900 text-white shadow-sm"
                  >
                    <ShoppingBag className="size-5" />
                    <span className="text-sm font-medium">
                      Đơn hàng của tôi
                    </span>
                  </Link>

                  <Link
                    href="/profile/history"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <HistoryIcon className="size-5" />
                    <span className="text-sm font-medium">Lịch sử</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
            <div className="lg:col-span-3">
              <div>
                <Tabs defaultValue="history" className="space-y-6">
                  <TabsList className="items-center justify-center rounded-none bg-gray-200 p-1 text-muted-foreground grid w-full grid-cols-3 max-w-md h-12">
                    <TabsTrigger
                      value="Lishsutaifile"
                      className="justify-center whitespace-nowrap rounded-none px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow flex items-center gap-2 h-10"
                    >
                      <Download className="lucide lucide-download h-4 w-4" />
                      Lịch sử tải file
                    </TabsTrigger>
                    <TabsTrigger
                      value="Lichsudanhgia"
                      className="justify-center whitespace-nowrap rounded-none px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow flex items-center gap-2 h-10"
                    >
                      <PencilLine values="lucide lucide-pen-line h-4 w-4" />
                      Lịch sử đánh giá
                    </TabsTrigger>
                    <TabsTrigger
                      value="Lichsugiaodich"
                      className="justify-center whitespace-nowrap rounded-none px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow flex items-center gap-2 h-10"
                    >
                      <CreditCard className="lucide lucide-credit-card h-4 w-4" />
                      Lịch sử giao dịch
                    </TabsTrigger>
                  </TabsList>
                  {/* <TabsContent
                    value="Lichsutaifile"
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
                  >
                    <div className="space-y-4">
                      <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-none border py-6 shadow-none">
                        <CardContent className="p-4 flex justify-between items-start">
                          <div className="flex space-x-4">
                            <div className="p-2 bg-gray-50 rounded-md">
                              <Image className="lucide lucide-image h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-medium">test.png</h3>
                                <div className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-green-50 text-green-700">
                                  Hoàn thành
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">14:16 - 09/01/2026</p>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>15.49KB</span>
                                <span>.</span>
                                <span>1 lần tải</span>
                              </div>
                            </div>
                          </div>
                          <button className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-primary hover:text-primary-foreground h-8 px-3 text-xs">
                             <Download className="lucide lucide-download h-4 w-4" />
                             Tải lại 
                          </button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent> */}
                  <TabsContent
                    value="Lichsutaifile"
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
                  >
                    <div className="text-center py-12">
                      <File className="lucide lucide-file h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium">
                        Không có lịch sử tải xuống
                      </h3>
                    </div>
                  </TabsContent>
                  <TabsContent value="Lichsudanhgia" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6">
                    <div className="text-center py-12">
                      <div className="text-gray-500" >Chưa có bình luận nào để hiện thị</div>
                    </div>
                  </TabsContent>
                  <TabsContent value="Lichsugiaodich" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6">
                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                      <p className="text-muted-foreground">Chưa có giao dịch nào</p>
                      <button className="cursor-pointer inline-flex items-center shadow-none! justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-muted disabled:text-gray-500 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-primary hover:text-primary-foreground h-8 px-3 text-xs">
                        <RefreshCw className="lucide lucide-refresh-cw w-4 h-4 mr-2"/>
                        Làm mới
                      </button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
