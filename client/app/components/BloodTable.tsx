import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { TBlood } from "~/types";
import ManageBloodStock from "./forms/ManageBloodStock";

export default function BloodTable({ bloodStock }: { bloodStock: TBlood[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Golongan Darah</TableHead>
          <TableHead>Stok</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bloodStock.map((blood) => (
          <TableRow key={blood.bloodType}>
            <TableCell>{blood.bloodType}</TableCell>
            <TableCell>{blood.stock || 0} </TableCell>
            <TableCell className="w-[200px]">
              <ManageBloodStock bloodType={blood.bloodType} stock={blood.stock} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
