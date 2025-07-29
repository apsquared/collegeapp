'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const colleges = [
  { id: '1', name: 'Stanford University', location: 'Stanford, CA', type: 'Private' },
  { id: '2', name: 'MIT', location: 'Cambridge, MA', type: 'Private' },
  { id: '3', name: 'Harvard University', location: 'Cambridge, MA', type: 'Private' },
  { id: '4', name: 'UC Berkeley', location: 'Berkeley, CA', type: 'Public' },
  { id: '5', name: 'UCLA', location: 'Los Angeles, CA', type: 'Public' },
  { id: '6', name: 'Yale University', location: 'New Haven, CT', type: 'Private' },
]

export default function CompareSchools() {
  const [firstCollege, setFirstCollege] = useState('')
  const [secondCollege, setSecondCollege] = useState('')

  const selectedFirst = colleges.find(c => c.id === firstCollege)
  const selectedSecond = colleges.find(c => c.id === secondCollege)

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Compare Colleges
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Side-by-side comparison of colleges to help you make the best decision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select First College</CardTitle>
              <CardDescription>
                Choose a college to compare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={firstCollege} onValueChange={setFirstCollege}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedFirst && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-medium">{selectedFirst.name}</h4>
                  <p className="text-sm text-slate-600">{selectedFirst.location}</p>
                  <p className="text-sm text-slate-500">{selectedFirst.type}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Second College</CardTitle>
              <CardDescription>
                Choose another college to compare
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={secondCollege} onValueChange={setSecondCollege}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.id} value={college.id}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedSecond && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-medium">{selectedSecond.name}</h4>
                  <p className="text-sm text-slate-600">{selectedSecond.location}</p>
                  <p className="text-sm text-slate-500">{selectedSecond.type}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {selectedFirst && selectedSecond && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>
                Side-by-side comparison of selected colleges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Criteria</TableHead>
                    <TableHead>{selectedFirst.name}</TableHead>
                    <TableHead>{selectedSecond.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Location</TableCell>
                    <TableCell>{selectedFirst.location}</TableCell>
                    <TableCell>{selectedSecond.location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Type</TableCell>
                    <TableCell>{selectedFirst.type}</TableCell>
                    <TableCell>{selectedSecond.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Acceptance Rate</TableCell>
                    <TableCell>4.3%</TableCell>
                    <TableCell>7.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tuition (Annual)</TableCell>
                    <TableCell>$56,169</TableCell>
                    <TableCell>$57,986</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Student Population</TableCell>
                    <TableCell>17,249</TableCell>
                    <TableCell>11,934</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Top Programs</TableCell>
                    <TableCell>Computer Science, Engineering, Business</TableCell>
                    <TableCell>Engineering, Computer Science, Physics</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Campus Size</TableCell>
                    <TableCell>8,180 acres</TableCell>
                    <TableCell>168 acres</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {!selectedFirst || !selectedSecond ? (
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Select two colleges above to see a detailed comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-500">
                Choose colleges from the dropdowns above to begin comparing
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
} 